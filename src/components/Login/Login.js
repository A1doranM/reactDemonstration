import React from 'react';
import {reduxForm} from "redux-form";
import {CreateField, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styleFor from '../common/FormsControls/FormControll.module.css';

let LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField('Email', 'email', [requiredField], Input)}
            {CreateField('Password', 'password', [requiredField], Input, {type: 'password'})}
            {CreateField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}

            {captchaUrl && <>
                <img src={captchaUrl} alt="captcha"/>
                {CreateField('Symbols from image', 'captchaUrl', [requiredField], Input, {type: 'text'})}
            </>
            }

            {error && <div className={styleFor.form_summary_error}>
                {error}
            </div>}
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

let Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl);
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
};

export default Login;