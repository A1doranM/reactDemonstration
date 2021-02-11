import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styleFor from "../common/FormsControls/FormControll.module.css";
import {AppStateType} from "../../redux/redux_store";
import {loginThunkCreator} from "../../redux/authReducer";
import {connect} from "react-redux";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captchaUrl: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;


let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [requiredField], Input, {}, "")}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [requiredField], Input, {type: "password"}, "")}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "Remember me")}

            {captchaUrl && <>
                <img src={captchaUrl} alt="captcha"/>
                {createField<LoginFormValuesTypeKeys>("Symbols from image", "captchaUrl", [requiredField], Input, {type: "text"}, "")}
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: "login"
})(LoginForm);

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string) => void,
}

type MapStatePropsType = {
    captchaUrl: string | null,
    isAuth: boolean,
}

let Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl);
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
};


export default connect(mapStateToProps, {login: loginThunkCreator})(Login);