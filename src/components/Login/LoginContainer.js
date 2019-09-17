import {connect} from "react-redux";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/authReducer";
import Login from "./Login";

let mapStateToProps = (state) => {
  return {
      isAuth: state.auth.isAuth
  }
};

let mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password, rememberMe) => {
            dispatch(loginThunkCreator(email, password, rememberMe));
        },
        logout: () => {
            dispatch(logoutThunkCreator())
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);