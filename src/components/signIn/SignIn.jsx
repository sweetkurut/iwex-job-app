import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import s from './SignIn.module.sass';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendSignIn } from '../../store/slices/userSlice';
import { saveCookie } from '../../utils/js_cookie';
import { useNavigate } from 'react-router-dom';
const SignIn = ({ setComponent }) => {
    const navigate = useNavigate();
    const [verificationError, setVerificationError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const onSubmit = async (formData) => {
        const data = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await dispatch(sendSignIn(data)).unwrap();
            saveCookie('accessToken', response.access)
            navigate('/');
        } catch (error) {
            console.log(error);
            setVerificationError(error?.error || 'An unknown error occurred');
        }
    };

    const handleSignUp = () => {
        setComponent('SignUp');
    };

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
                    Вход
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
                                error={Boolean(errors.password) || Boolean(verificationError)}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                label="Пароль"
                                name="password"
                                autoComplete="password"
                                type="password" // Specify the type as "password"
                                error={Boolean(errors.password) || Boolean(verificationError)}
                                helperText={errors.password?.message || verificationError}
                                {...register('password', { required: 'Введите пароль' })}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </Button>
                    <Grid container style={{ flexDirection: 'column' }}>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Забыли пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={handleSignUp} variant="body2" className={s.link}>
                                Нет учетной записи? Зарегистрируйтесь
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
