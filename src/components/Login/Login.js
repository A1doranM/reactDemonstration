import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'login'}
                       placeholder={'Login'}
                       component={Input}
                       validate={[requiredField]}/>
            </div>
            <div>
                <Field name={'password'}
                       placeholder={'Password'}
                       component={Input}
                       validate={[requiredField]}/>
            </div>
            <div>
                <Field name={'rememberMe'}
                       type={'checkbox'}
                       component={Input}
                       validate={[requiredField]}/>
                remember me
            </div>
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

    };

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

export default Login;