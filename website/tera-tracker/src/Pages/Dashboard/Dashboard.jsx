import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  textStyle1: {
    color: theme.palette.primary.main,
    fontSize: "2rem", //1rem -> 16px
    textAlign: "center",
  },
}));


/*
  This is the component class

*/
function P_DASHBOARD() {

  const classes = useStyles();

  return (
    <Container maxWidth="xl" >
      <p className={classes.textStyle1} >Hello World</p>
      <p className={classes.textStyle1} >Testing number 2</p>

    </Container>
  );
  
}

export default P_DASHBOARD;
