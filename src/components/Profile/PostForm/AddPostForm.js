import React from 'react';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength = maxLengthCreator(300);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={'newPostBody'}
                       placeholder={'Enter your post'}
                       validate={[requiredField, maxLength]}
                />
                <button>send</button>
            </div>
        </form>
    )
};

const AddPostFormRedux = reduxForm({form: 'profileAddPostForm'})(AddPostForm);

export default AddPostFormRedux;