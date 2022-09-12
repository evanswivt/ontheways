import {BoxContainer, Container, Description} from "./forgotPassword.styles";
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
import {forgotPassword} from "../../../features/user/apiCalls";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ArrowBackIos} from "@mui/icons-material";

const ForgotPassword = () => {

    // const { isFetching, error , errorList} = useSelector((state : RootState) : UserState => state.user);
    const [errorMessage, setErrorMessage] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            loginId: '',
        },
        validationSchema: Yup.object({
            loginId: Yup
                .string()
                .max(255)
                .required(
                    'Login ID is required'),
        }),
        onSubmit: async ({loginId}) => {
            try{
                setIsFetching(true)
                const res = await forgotPassword(dispatch,loginId);
                setIsFetching(false)
                res.success && navigate('/verification');
            } catch (e : any) {
                setIsFetching(false)
                    setErrorMessage(
                        e.message || 'Use email not found.',
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
                        Forgot password?
                    </Typography>
                </Box>
                <Description>Enter your email address below and we'll send you password reset OTP.</Description>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1} sx={{mt: 1}}>
                        <Grid item xs={12}>
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
                    {errorMessage &&
                            <Typography
                                color="error"
                                variant="body2"
                            >
                                {errorMessage}
                            </Typography>
                    }
                        </Grid>
                        <Grid item xs={12}>
                        <Button
                            color="primary"
                            disabled={isFetching}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Send Mail
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
                                    to="/login">
                                    Back to login
                                </RouterLink>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </BoxContainer>
        </Container>
    )
}

export default ForgotPassword;