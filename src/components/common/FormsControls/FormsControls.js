import React from 'react';
import styleFor from './FormControll.module.css';

export const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={styleFor.formControl + ' ' + (hasError ? styleFor.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
};

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <  FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
};