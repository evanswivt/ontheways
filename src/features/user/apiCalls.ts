import { Dispatch, AnyAction } from "redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  signOutSuccess,
  signUpFailure,
  signupStart,
  signUpSuccess
} from "./userSlice";
import api, {userRequest} from "../../services/api";
import Notification from "../../services/notification"

export const login = async (dispatch: Dispatch<AnyAction>, user: { loginName?: string, email?: string, password: string; }) => {
  dispatch(loginStart());
  try {
    const res = await api.post(user.email ? "users/authenticate":"users/authenticate-by-loginname", user);
    if(res.data.jwtToken) {
      localStorage.setItem('accessToken',res.data.jwtToken)
    }
    Notification.success('Logged in successfully.','BOTTOM_RIGHT',{autoClose: 2000});
    dispatch(loginSuccess(res.data));
    return Promise.resolve(res);
  } catch (err : any) {
    dispatch(loginFailure(err.ErrorList?err.ErrorList : []));
    return Promise.reject(err);
  }
};

export const register = async (dispatch: Dispatch<AnyAction>, user: { loginName: string; email: string;
  firstName: string; lastName: string; password: string; confirmPassword: string; policy: boolean; }) =>
{
  dispatch(signupStart());
  try {
    // validation
    const loginNameAvailability : any = await api.post("users/check-loginname-availability", {loginName: user.loginName});
    if(!loginNameAvailability.success) {
      dispatch(signUpFailure());
      return Promise.reject({field: 'loginName', message: 'Login name not available. Please select another one.'});
    }

    const emailAvailability : any = await api.post("users/check-email-availability", {email: user.email});
    if(!emailAvailability.success) {
      dispatch(signUpFailure());
      return Promise.reject({field: 'email', message: 'Email not available. Please select another one.'});
    }

    const res : any = await api.post("users/register", user);
    if(res.ErrorList.length > 0 && !res.success) {
      dispatch(signUpFailure());
    } else {
      dispatch(signUpSuccess());
      return Promise.resolve(res);
    }
  } catch (err : any) {
    dispatch(signUpFailure());
    return Promise.reject('Registration failed.');
  }
};

export const forgotPassword = async (dispatch: Dispatch<AnyAction>, loginId: string) =>
{
  try {
    const res : any = await userRequest.post("users/forgot-password", {email: loginId});
    Notification.success('Email sent.','BOTTOM_RIGHT',{autoClose: 2000});
    return Promise.resolve(res);
  } catch (err : any) {
    return Promise.reject(err);
  }
};

export const verifyResetToken = async (dispatch: Dispatch<AnyAction>, token: string) =>
{
  try {
    const res : any = await userRequest.post("users/validate-reset-token", {token});
    return Promise.resolve(res);
  } catch (err : any) {
    return Promise.reject('User email not found');
  }
};

export const resetPassword = async (dispatch: Dispatch<AnyAction>, resetPasswordData:
    { password: string; confirmPassword: string; token: string; }) =>
{
  try {
    const res : any = await userRequest.post("users/reset-password", resetPasswordData);
    return Promise.resolve(res);
  } catch (err : any) {
    return Promise.reject(err);
  }
};

export const logout = async (dispatch: Dispatch<AnyAction>) =>
{
  try {
    localStorage.removeItem('accessToken');
    dispatch(signOutSuccess());
    // window.location.href = '/login';
    return Promise.resolve();
  } catch (err : any) {
    localStorage.removeItem('accessToken');
    dispatch(signOutSuccess());
    console.error(err)
  }
};


export const checkUserSession = (dispatch: Dispatch<AnyAction>, currentUser: any) =>
{
  try {
    if(!currentUser) return;
  } catch (err : any) {
    dispatch(loginFailure([]));
  }
};
