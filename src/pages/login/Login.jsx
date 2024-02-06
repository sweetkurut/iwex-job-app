import React, { useState } from 'react'
import SignIn from '../../components/signIn/SignIn'
import SignUp from '../../components/signUp/SignUp'
import ConfirmEmail from '../../components/confirmEmail/ConfirmEmail'
import EnterPassword from '../../components/enterPassword/enterPassword'
import s from './Login.module.sass'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux'


const Login = () => {
    const [component, setComponent] = useState('SignIn')
    const [email, setEmail] = useState('')
    const { isLoading } = useSelector(state => state.user)
    const renderSignComponent = () => {
        switch (component) {
            case 'SignIn':
                return <SignIn setComponent={setComponent} />;
            case 'SignUp':
                return <SignUp setComponent={setComponent} setEmail={setEmail} />;
            case 'confirmEmail':
                return <ConfirmEmail setComponent={setComponent} email={email} />;
            case 'enterPassword':
                return <EnterPassword setComponent={setComponent} email={email} />;
            default:
                return null;
        }
    }

    return (
        <div className={`${s.box} ${isLoading && s.loading}`} >
            {isLoading && <LinearProgress />}
            {
                renderSignComponent()
            }
        </div>
    )
}

export default Login