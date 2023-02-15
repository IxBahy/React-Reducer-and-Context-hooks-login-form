import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailHandler = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.emailValue, isValid: action.emailValue.includes('@') }
  } else if (action.type === 'EMAIL_BLUR') {
    return { value: state, isValid: state.isValid }
  } else {
    return { value: '', isValid: false }
  }
}
const Login = (props) => {

  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailHandler, { value: '', isValid: null })

  useEffect(() => {
    const loginTimeOut = setTimeout(() => {
      if (emailState.isValid && enteredPassword > 0) {
        setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6)
      }
      console.log('77777');
    }, 500);
    return () => {
      console.log('555555');
      clearTimeout(loginTimeOut)
    };
  }, [emailState, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', emailValue: event.target.value })

  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'EMAIL_BLUR' })
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'true')
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
