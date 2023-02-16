import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import classes from './Input.module.css'
const Input = forwardRef((props, ref) => {
    const inputRef = useRef()
    const activate = () => {
        inputRef.current.focus();
    }
    useImperativeHandle(ref, () => {
        return { focus: activate }
    }

    )
    return (
        <>
            <div
                className={`${classes.control} ${props.state.isValid === false ? classes.invalid : ''}`}
            >
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    ref={inputRef}
                    type={props.type}
                    id={props.id}
                    onChange={props.ChangeHandler}
                    onBlur={props.validateHandler}
                />
            </div>
        </>
    )
})
export default Input;
