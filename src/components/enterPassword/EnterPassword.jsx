import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import s from './EnterPassword.module.sass';
import { sendEnterPassword } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { saveCookie } from '../../utils/js_cookie';

const EnterPassword = ({ setComponent, email }) => {
    const { handleSubmit, control, watch, formState: { errors } } = useForm();
    const password = watch('password', '');
    const dispatch = useDispatch();

    const onSubmit = async (formData) => {
        const data = {
            email: email,
            password: formData.password,
            password_confirm: formData.password_confirm,
        };
        try {
            const response = await dispatch(sendEnterPassword(data));
            // setComponent('SignIn');
            console.log('вы зарегались');
            console.log(response);
            saveCookie('accessToken', response.payload.access)
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
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
                    Придумайте пароль
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Введите пароль' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Пароль"
                                type="password"
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password_confirm"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Введите подтверждение пароля',
                            validate: (value) => value === password || 'Пароли должны совпадать',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Подтверждение пароля"
                                type="password"
                                error={Boolean(errors.password_confirm)}
                                helperText={errors.password_confirm?.message}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Подтвердить
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={handleCancel} variant="body2" className={s.link} >
                                Отмена
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default EnterPassword;
