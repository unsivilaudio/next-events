import { useState } from 'react';

import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import classes from 'styles/components/auth/AuthForm.module.scss';

const AuthForm = ({ type = 'register', toggleAuth, handleAuthSubmit }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function handleChangeInput(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'userId':
                setUserId(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'passwordConfirm':
                setPasswordConfirm(value);
                break;
            default:
                break;
        }
    }

    function submitAuthHandler(e) {
        e.preventDefault();
        if (userId !== '' && password !== '') {
            if (type === 'register' && password !== passwordConfirm) {
                console.log('PASSWORDS DONT MATCH');
                return;
            }

            handleAuthSubmit({ userId, password });
        }
    }

    return (
        <div className={classes.AuthForm}>
            <div className={classes.Title}>
                {type === 'signin' ? 'Sign In' : 'Register'}
            </div>
            <form className={classes.Form} onSubmit={submitAuthHandler}>
                <div className={classes.FormControl}>
                    <Input
                        label={type === 'signin' ? 'User ID' : 'Email'}
                        name='userId'
                        value={userId}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className={classes.FormControl}>
                    <Input
                        label='Password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={handleChangeInput}
                    />
                </div>
                {type === 'register' && (
                    <div className={classes.FormControl}>
                        <Input
                            label='Confirm Password'
                            name='passwordConfirm'
                            type='password'
                            value={passwordConfirm}
                            onChange={handleChangeInput}
                        />
                    </div>
                )}
                <div className={classes.FormActions}>
                    <Button theme='success' type='submit'>
                        {type === 'signin' ? 'Login' : 'Sign Up'}
                    </Button>
                    <p className={classes.HelpText} onClick={toggleAuth}>
                        {type === 'signin'
                            ? 'Not a member yet? Switch to registration.'
                            : 'Already a member? Switch to Login.'}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
