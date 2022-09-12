import {BoxContainer, Container} from "../forgotPassword/forgotPassword.styles";
import {
    Box,
    Button,
    Divider,
    Grid, InputAdornment,
    Link,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {resetPassword} from "../../../features/user/apiCalls";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import {ArrowBackIos} from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import Notification from '../../../services/notification'

const ResetPassword = () => {

    const { state } : any = useLocation();
    const { token } = state;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
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
                })
            }),
        onSubmit: async (values) => {
            try{
                const res = await resetPassword(dispatch, {token: token,...values});
                res.success && navigate('/login')
                Notification.success('Password reset successfull.')
            } catch (e : any) {
                setErrorMessage(
                    e.message || 'Reset password Error. Please try again.',
                );
            }
        }
    });
    return (
        <Container>
            <BoxContainer>
                <Box sx={{ my: 3, justifyContent: 'center', display: 'flex' }}>
                    <Typography
                        color="primary"
                        variant="h2"
                    >
                        New Password
                    </Typography>
                </Box>
                <form onSubmit={formik.handleSubmit} style={{marginTop: '0px'}}>
                    <Grid container>
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon fontSize='inherit'/>
                                        </InputAdornment>
                                    ),
                                }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon fontSize='inherit'/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {errorMessage &&
                            <Typography
                                color="error"
                                variant="body2"
                            >
                                {errorMessage}
                            </Typography>
                    }
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                        <Button
                            color="primary"
                            // disabled={isFetching}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Reset
                        </Button>
                    <Box sx={{ my: 2, justifyContent: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                            </Grid>
                        <Grid item xs={12} sx={{textAlign:'center'}}>
                            <Link
                                variant="subtitle2"
                                underline="hover"
                                sx={{display:'flex',justifyContent: 'center', alignItems: 'center'}}
                            >
                                <ArrowBackIos color='primary' fontSize='inherit'/>
                                <RouterLink
                                    style={{textDecoration: 'none',color: 'inherit'}}
                                    to="/verification">
                                    Back
                                </RouterLink>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </BoxContainer>
        </Container>
    )
}

export default ResetPassword;