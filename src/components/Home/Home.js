import React, { useContext } from 'react';
import Context from '../Store/Context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = () => {
  const ctx = useContext(Context)
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
