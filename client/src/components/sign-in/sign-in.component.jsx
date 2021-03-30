import { React, useState } from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';  

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' })
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = userCredentials;

        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {value, name} = event.target;

        // format below means we can have one function for our inputs instead of two
        setCredentials({...userCredentials, [name]: value});
    }

    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="email" 
                    type="email" 
                    value={email} 
                    required
                    handleChange={handleChange}
                    label="email" />

                <FormInput 
                    name="password" 
                    type="password" 
                    value={password} 
                    required
                    handleChange={handleChange}
                    label="password" />

                <div className="buttons">
                    <CustomButton type="submit" value="Submit Form">
                        Sign In
                    </CustomButton>

                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
                        Sign In with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(
    null,
    mapDispatchToProps
)(SignIn);