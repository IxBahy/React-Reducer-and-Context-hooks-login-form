import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Context from '../Store/Context';
import Input from '../Input/Input.js';


//dispatching actions
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

//dispatch handler
const dispatchHandler = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return validateAction(action)
  } else if (action.type === 'BLUR') {
    return blurState(state, action.for)
  } else {
    return defaultState()
  }
}
//*********************************************************/
//*********************************************************/
//Component
const Login = () => {
  //context 
  const ctx = useContext(Context)
  //refs
  const emailRef = useRef()
  const passwordRef = useRef()
  //states
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(dispatchHandler, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(dispatchHandler, { value: '', isValid: null })
  //vars
  const loginValidite = emailState.isValid && passwordState.isValid
  //*********************************************************/
  //*********************************************************/
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

  //*********************************************************/
  //*********************************************************/

  //form handlers
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
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailRef.current.focus()
    } else {
      passwordRef.current.focus()
    }
  };
  //*********************************************************/
  //*********************************************************/
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' ref={emailRef} label='E-Mail' type='email' ChangeHandler={emailChangeHandler} validateHandler={validateEmailHandler} state={emailState} />
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <Input id='password' ref={passwordRef} label='Password' type='password' ChangeHandler={passwordChangeHandler} validateHandler={validatePasswordHandler} state={passwordState} />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
