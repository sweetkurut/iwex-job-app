import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import s from './SignUp.module.sass'
import { sendSignUp } from '../../store/slices/userSlice';
const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Авторские права © '}
            <Link color="inherit" href="https://mui.com/">
                Iwex
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const SignUp = ({ setComponent, setEmail }) => {

    const dispatch = useDispatch()
    const [isChecked, setChecked] = useState();
    const [verificationError, setVerificationError] = useState('');


    const { register, handleSubmit, formState: { errors } } = useForm();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    const onSubmit = async (formData) => {
        const data = {
            email: formData.email,
            role: 'is_employer'
        };

        try {
            const response = await dispatch(sendSignUp(data)).unwrap();
            setComponent('confirmEmail');
            setEmail(formData.email)

        } catch (error) {
            setVerificationError(error?.email || 'An unknown error occurred');
        }
    };



    const handleSignIn = () => {
        setComponent('SignIn');
    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Адрес электронной почты"
                                name="email"
                                autoComplete="email"
                                {...register('email', {
                                    required: 'Введите адрес электронной почты',
                                    pattern: {
                                        value: emailRegex,
                                        message: 'Неверный адрес электронной почты',
                                    },
                                })}
                                error={Boolean(errors.verification_code) || Boolean(verificationError)}
                                helperText={errors.verification_code?.message || verificationError}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={isChecked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        {...register('checked', {
                                            required: 'Это поле обязательно для выбора',
                                        })}
                                    />
                                }
                                label="Политика конфиденциальности"
                            />
                            {errors.checked && (
                                <Typography variant="body2" color="error" className={s.errorText}>
                                    {errors.checked.message}
                                </Typography>
                            )}
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={handleSignIn} variant="body2" className={s.link} >
                                Уже есть аккаунт? Войти
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>

    );
}

export default SignUp