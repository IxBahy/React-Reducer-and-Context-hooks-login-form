import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';



const validateState = (type, state) => {
  if (type === 'email') {
    return { value: state.value, isValid: state.value.includes('@') }
  } else if (type === 'password') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
}

const blurState = (type, state) => {
  if (type === 'email') {
    return { value: state, isValid: state.isValid }
  } else if (type === 'password') {
    return { value: state, isValid: state.isValid }
  }
}

const defaultState = () => {
  return { value: '', isValid: false }
}

const dispatchHandler = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return validateState(action.for, action)
  } else if (action.type === 'BLUR') {
    return blurState(action.for, state)
  } else {
    return defaultState()
  }
}

const Login = (props) => {


  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(dispatchHandler, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(dispatchHandler, { value: '', isValid: null })

  useEffect(() => {
    const loginTimeOut = setTimeout(() => {
      if (emailState.isValid && passwordState.value.length > 0) {
        setFormIsValid(emailState.isValid && passwordState.value.trim().length > 6)
      }
      console.log('77777');
    }, 500);
    return () => {
      console.log('555555');
      clearTimeout(loginTimeOut)
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value, for: 'email' })

  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value, for: 'password' })
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'BLUR', for: 'email' })
  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: 'BLUR', for: 'password' })

  };

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'true')
    props.onLogin(emailState.value, passwordState.value);
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
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
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
