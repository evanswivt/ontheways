import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel, InputAdornment,
    Link,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {resetErrorState, UserState} from "../../../features/user/userSlice";
import {login} from "../../../features/user/apiCalls";
import {useEffect, useState} from "react";
import {LoginContainer} from "./login.styles";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const Login = () => {
    const dispatch = useDispatch();

    const { isFetching, error , errorList, currentUser} = useSelector((state : RootState) : UserState => state.user);
    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        dispatch(resetErrorState());
    }, [currentUser, dispatch]);


    const formik = useFormik({
        initialValues: {
            loginId: 'admin@blueskyio.com',
            password: 'password'
        },
        validationSchema: Yup.object({
            loginId: Yup
                .string()
                .max(255)
                .required(
                    'Login ID is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required')
        }),
        onSubmit: ({password,loginId}) => {
                let userCredentials: {password: string, email?: string, loginName?: string} = {
                    password
                };
                if(validateEmail(loginId)) {
                    userCredentials.email = loginId;
                } else {
                    userCredentials.loginName = loginId
                }
                const res = login(dispatch, userCredentials);
                res.then((data) => {
                    navigate('/dashboard');
                })
            }
    });

    return (
        <>
            <LoginContainer>
                <Box
                    component="main"
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid rgba(144, 202, 249, 0.46)',
                        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        maxWidth: '450px',
                    }}
                >
                    <Container maxWidth="sm">
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ my: 3, justifyContent: 'center', display: 'flex' }}>
                                <Typography
                                    color="primary"
                                    variant="h2"
                                >
                                    Sign In
                                </Typography>
                            </Box>
                            <TextField
                                error={Boolean(formik.touched.loginId && formik.errors.loginId)}
                                fullWidth
                                helperText={formik.touched.loginId && formik.errors.loginId}
                                label="Login ID"
                                margin="normal"
                                name="loginId"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.loginId}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon fontSize='inherit'/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label="Password"
                                margin="normal"
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon fontSize='inherit'/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Typography variant="subtitle1" color="primary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                    <Link>
                                        <RouterLink to="/forgotPassword" style={{textDecoration: 'none',color: 'inherit'}}>
                                            Forgot Password?
                                        </RouterLink>
                                    </Link>
                                </Typography>
                            </Stack>
                            {error && errorList &&
                                errorList.map((errorItem: any, index) => (
                                    <Typography
                                        color="error"
                                        variant="body2"
                                        key={index}
                                    >
                                        {errorItem.detail}
                                    </Typography>
                                ))
                            }
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    disabled={isFetching}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign In Now
                                </Button>
                            </Box>
                            <Box sx={{ my: 2, justifyContent: 'center', display: 'flex' }}>
                                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                            </Box>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                Don&apos;t have an account?
                                {' '}
                                    <Link
                                        variant="subtitle2"
                                        underline="hover"
                                    >
                                        <RouterLink to="/register" style={{textDecoration: 'none',color: 'inherit'}}>
                                            Sign Up
                                        </RouterLink>
                                    </Link>
                            </Typography>
                        </form>
                    </Container>
                </Box>
            </LoginContainer>
        </>
    );
};

export default Login;