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
  paper_style:{
    width: "20%",
    padding: theme.spacing(6),
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
      <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
        <Paper elevation={3} className={classes.paper_style}>

            <p>Hello World</p>

        </Paper>
        <Paper elevation={3} className={classes.paper_style}>

            <img src={img.default} width="100%" />

        </Paper>

      </Grid>
      
    </Container>
  );
  
}

export default P_REPORTS;
