import  { useState } from 'react';
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
import s from './ConfirmEmail.module.sass';
import { sendVerifyEmail } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';

const ConfirmEmail = ({ setComponent, email }) => {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [verificationError, setVerificationError] = useState('');
    const dispatch = useDispatch();
    const onSubmit = async (formData) => {
        const data = {
            email: email,
            verification_code: formData.verification_code,
        };
        try {
            const response = await dispatch(sendVerifyEmail(data)).unwrap();
            setComponent('enterPassword');
            console.log(response);
        } catch (error) {
            console.log(error);
            setVerificationError(error?.error || 'An unknown error occurred');
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
                    Верификация Email
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Controller
                        name="verification_code"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Введите код верификации' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Код верификации"
                                inputProps={{
                                    maxLength: 5,
                                }}
                                placeholder='_ _ _ _ _'
                                error={Boolean(errors.verification_code) || Boolean(verificationError)}
                                helperText={errors.verification_code?.message || verificationError}
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

export default ConfirmEmail;
