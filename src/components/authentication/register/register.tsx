import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {UserState} from "../../../features/user/userSlice";
import {register} from "../../../features/user/apiCalls";
import { useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import Notification from "../../../services/notification";


// export type ActiveVehicle = {
//   vehicleTypeId: number,
//   vehicleTypeName: string,
// }
// export type DefaultFormFields = {
//   currentFile: (string | Blob | any),
//   previewImage: string,
//   progress: number,
//   message: string,
//   imageInfos: string[],
//   isError: boolean,
// }
const Register = () => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const {isFetching} = useSelector((state: RootState): UserState => state.user);
  const [errorMessage, setErrorMessage] = useState('')
  // const [vehicleType, setVehicleType] = useState([]);
  //
  // const defaultFormFields: DefaultFormFields = {
  //   currentFile: '',
  //   previewImage: '',
  //   progress: 0,
  //   message: '',
  //   imageInfos: [],
  //   isError: false,
  // }
  // const [fields, setFields] = useState(defaultFormFields);

  // const {
  //   imageInfos,
  // } = fields;

  // useEffect(() => {
  //     getActiveVehicleType().then((res) => {
  //       setVehicleType(res.data.vehicleTypes)
  //     }).catch((error) => {
  //       consoleLog(error)
  //     });
  // }, []);

  const formik = useFormik({
    initialValues: {
      loginName: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      // vehicleType: [],
      // licensePlate: '3232323',
      policy: false,
      policy2: false
    },
    validationSchema: Yup.object({
      email: Yup
          .string()
          .email(
              'Must be a valid email')
          .max(255)
          .required(
              'Email is required'),
      loginName: Yup
          .string()
          .max(255)
          .required(
              'Login name is required'),
      firstName: Yup
          .string()
          .max(255)
          .required(
              'First name is required'),
      lastName: Yup
          .string()
          .max(255)
          .required(
              'Last name is required'),
      password: Yup
          .string()
          .max(255)
          .required(
              'Password is required'),
      confirmPassword: Yup.string().when("password", {
        is: (val: string) => (val && val.length > 0),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
      }),
      policy: Yup
          .boolean()
          .oneOf(
              [true],
              'This field must be checked'
          ),
      policy2: Yup
          .boolean()
          .oneOf(
              [true],
              'This field must be checked'
          )
    }),
    onSubmit: async (values,{
      setFieldError,
    }) => {
      try{
         await register(dispatch, {...values});
         setErrorMessage('')
          Notification.success('Registration successfull and Verification email sent.','BOTTOM_RIGHT',{autoClose: 2000});
      } catch (e : any) {
        console.log(e)
        if(e.field) {
          setFieldError(e.field, e.message);
        } else {
          setErrorMessage(e)
        }
      }
    }
  });

  return (
      <>
        <Box
            component="main"
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexGrow: 1,
              minHeight: '100%'
            }}
        >
          <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Box sx={{my: 3}}>
                  <Typography
                      color="primary"
                      variant="h2"
                  >
                    Create a new account
                  </Typography>
                </Box>
                <Grid item xs={12} sm={12}>
                  <TextField
                      error={Boolean(formik.touched.loginName && formik.errors.loginName)}
                      fullWidth
                      helperText={formik.touched.loginName && formik.errors.loginName}
                      label="Login Name"
                      margin="normal"
                      name="loginName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.loginName}
                      variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                      fullWidth
                      helperText={formik.touched.firstName && formik.errors.firstName}
                      label="First Name"
                      margin="normal"
                      name="firstName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                      fullWidth
                      helperText={formik.touched.lastName && formik.errors.lastName}
                      label="Last Name"
                      margin="normal"
                      name="lastName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                      variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                      error={Boolean(formik.touched.password && formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                      variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                      error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                      fullWidth
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                      label="Confirm Password"
                      margin="normal"
                      name="confirmPassword"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.confirmPassword}
                      variant="outlined"
                  />
                </Grid>
              {/*  <Grid item xs={12} sm={12}>*/}
              {/*    <Typography*/}
              {/*        color="textPrimary"*/}
              {/*        variant="h6"*/}
              {/*    >*/}
              {/*      Vehicle Profile (Optional)*/}
              {/*    </Typography>*/}
              {/*  </Grid>*/}
              {/*  <Grid item xs={12} sm={6}>*/}
              {/*    <FormControl fullWidth>*/}
              {/*      <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>*/}
              {/*      <Select*/}
              {/*          error={Boolean(formik.touched.vehicleType && formik.errors.vehicleType)}*/}
              {/*          name="vehicleType"*/}
              {/*          labelId="demo-simple-select-label"*/}
              {/*          id="demo-simple-select"*/}
              {/*          value={formik.values.vehicleType}*/}
              {/*          label="Vehicle Type"*/}
              {/*          onChange={formik.handleChange}*/}
              {/*      >*/}
              {/*        {*/}
              {/*          vehicleTypes.map((vehicle: ActiveVehicle, key) => (*/}
              {/*              <MenuItem key={key} value={vehicle.vehicleTypeId}>{vehicle.vehicleTypeName}</MenuItem>*/}
              {/*          ))*/}
              {/*        }*/}
              {/*      </Select>*/}
              {/*    </FormControl>*/}
              {/*  </Grid>*/}
              {/*  <Grid item xs={12} sm={6}>*/}
              {/*    <TextField*/}
              {/*        error={Boolean(formik.touched.licensePlate && formik.errors.licensePlate)}*/}
              {/*        fullWidth*/}
              {/*        helperText={formik.touched.licensePlate && formik.errors.licensePlate}*/}
              {/*        label="License Plate"*/}
              {/*        name="licensePlate"*/}
              {/*        onBlur={formik.handleBlur}*/}
              {/*        onChange={formik.handleChange}*/}
              {/*        value={formik.values.licensePlate}*/}
              {/*        variant="outlined"*/}
              {/*    />*/}
              {/*  </Grid>*/}
              {/*  <Grid item xs={12} sm={12}>*/}
              {/*    <Typography*/}
              {/*        color="textPrimary"*/}
              {/*        variant="h6"*/}
              {/*    >*/}
              {/*      Upload Pictures*/}
              {/*    </Typography>*/}
              {/*    <UploadImagesComponent handleChange={(data: SetStateAction<DefaultFormFields>)=> setFields(data)} fields={fields}/>*/}
              {/*</Grid>*/}
              <Grid item xs={12} sm={12}>
                <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      ml: -1
                    }}
                >
                  <Checkbox
                      checked={formik.values.policy}
                      name="policy"
                      onChange={formik.handleChange}
                  />
                  <Typography
                      color="textSecondary"
                      variant="body2"
                  >
                    I agree to On the ways&apos; Terms of Use and acknowledge that i have read the Privacy Policy.
                  </Typography>
                </Box>
                {Boolean(formik.touched.policy && formik.errors.policy) && (
                    <FormHelperText error>
                      {formik.errors.policy}
                    </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      ml: -1
                    }}
                >
                  <Checkbox
                      checked={formik.values.policy2}
                      name="policy2"
                      onChange={formik.handleChange}
                  />
                  <Typography
                      color="textSecondary"
                      variant="body2"
                  >
                    I also agree that Ontheways&apos; or its representatives may contact me by email, phone (including
                    by automated means) at the number I provide, including for marketing purposes.
                  </Typography>
                </Box>
                {Boolean(formik.touched.policy2 && formik.errors.policy2) && (
                    <FormHelperText error>
                      {formik.errors.policy2}
                    </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
              {
                errorMessage &&
                      <Typography
                          color="error"
                          variant="body2"
                      >
                        {errorMessage}
                      </Typography>
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
                Sign Up Now
              </Button>
            </Box>
              </Grid>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  <RouterLink to="/login" style={{textDecoration: 'none',color: 'inherit'}}>
                    Sign In
                  </RouterLink>
                </Link>
            </Typography>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;


