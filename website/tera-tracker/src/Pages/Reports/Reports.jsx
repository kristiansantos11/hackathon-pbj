import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Paper } from '@material-ui/core';

const img = require('./testimage.jpg')

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  textStyle1: {
    color: theme.palette.primary.main,
    fontSize: "2rem", //1rem -> 16px
    textAlign: "left",
  },
  paper_style:{
    width: "43%",
    padding: theme.spacing(30),
    margin: theme.spacing(3),
  },
  paper_style2:{
    width: "88.5%",
    padding: theme.spacing(15),
    margin: theme.spacing(3),
  },
}));


/*
  This is the component class

*/
function P_REPORTS() {

  const classes = useStyles();

  return (
    <Container maxWidth="xl" >
      <p className={classes.textStyle1} >Data Analysis</p>
      <Grid
          container
          direction="row"
          justifyContent="top"
          alignItems="flex-start"
        >
        <Paper elevation={3} className={classes.paper_style}>



        </Paper>
        <Paper elevation={3} className={classes.paper_style}>



        </Paper>
        <Paper elevation={3} className={classes.paper_style2}>



        </Paper>        

      </Grid>
      
    </Container>
  );
  
}

export default P_REPORTS;
