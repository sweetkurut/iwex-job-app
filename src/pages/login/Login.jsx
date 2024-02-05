import React, { useState } from 'react'
import SignIn from '../../components/signIn/SignIn'
import SignUp from '../../components/signUp/SignUp'
import ConfirmEmail from '../../components/confirmEmail/ConfirmEmail'
import EnterPassword from '../../components/enterPassword/enterPassword'

const Login = () => {
    const [component, setComponent] = useState('SignIn')
    const [email, setEmail] = useState('')
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
        <>
            {
                renderSignComponent()
            }
        </>
    )
}

export default Login