import {BoxContainer, Container, Description} from "../forgotPassword/forgotPassword.styles";
import {
    Box,
    Button,
    Divider,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {verifyResetToken} from "../../../features/user/apiCalls";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import { ArrowBackIos} from "@mui/icons-material";


const Verification = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            token: '',
        },
        validationSchema: Yup.object({
            token: Yup
                .string()
                .max(255)
                .required(
                    'Token is required'),
        }),
        onSubmit: async ({token}) => {
            try{
                setIsFetching(true)
                const res = await verifyResetToken(dispatch,token);
                setIsFetching(false)
                res.success && navigate('/resetPassword',{state: {token: token}})
            } catch (e : any) {
                setIsFetching(false)
                setErrorMessage(
                    e.message || 'Token Invalid.',
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
                        Verification
                    </Typography>
                </Box>
                <Description>Enter verification code sent to your email address.</Description>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1} sx={{mt: 1}}>
                        <Grid item xs={12}>
                    <TextField
                        error={Boolean(formik.touched.token && formik.errors.token)}
                        fullWidth
                        helperText={formik.touched.token && formik.errors.token}
                        label="Token"
                        margin="normal"
                        name="token"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.token}
                        variant="outlined"
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
                            Verify
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
                                to="/forgotPassword">
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

export default Verification;