import React from "react";
import styleFor from './ProfileInfo.module.css';
import {CreateField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type="submit">save</button>
            </div>
            <div>
                <b>Full name</b>: {CreateField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: {CreateField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>Looking for a job</b>:
                {CreateField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me</b>: {CreateField("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(name => {
                    return (
                        <div className={styleFor.contact}>
                            <b>{name}: {CreateField(name, `contacts.${name}`, [], Input)}</b>
                        </div>
                    )
            })}
            </div>
        </form>
    )
};

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataFormReduxForm;