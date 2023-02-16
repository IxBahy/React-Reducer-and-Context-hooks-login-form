import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Context from '../Store/Context';



const validateAction = (action) => {
  if (action.for === 'email') {
    return { value: action.value, isValid: action.value.includes('@') }
  } else if (action.for === 'password') {
    return { value: action.value, isValid: action.value.trim().length > 6 }
  }
}

const blurState = (state, type) => {
  if (type === 'email') {
    console.log(state);
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
    return validateAction(action)
  } else if (action.type === 'BLUR') {
    return blurState(state, action.for)
  } else {
    return defaultState()
  }
}

const Login = () => {
  const ctx = useContext(Context)

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(dispatchHandler, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(dispatchHandler, { value: '', isValid: null })

  const loginValidite = emailState.isValid && passwordState.isValid

  useEffect(() => {
    const loginTimeOut = setTimeout(() => {
      if (emailState.isValid && passwordState.value.length > 0) {
        setFormIsValid(emailState.isValid && passwordState.isValid)
      }
    }, 250);
    return () => {
      clearTimeout(loginTimeOut)
    };
  }, [loginValidite]);

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
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
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
