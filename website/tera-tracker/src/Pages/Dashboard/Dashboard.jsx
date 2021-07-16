import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Paper } from '@material-ui/core';

const img = require('./building.png')
const img2 = require('./1.png')
const img3 = require('./2.png')
const img4 = require('./3.png')

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
  textStyle2: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem", //1rem -> 16px
    textAlign: "center",
  },
  textStyle3: {
    color: theme.palette.primary.main,
    fontSize: "1rem", //1rem -> 16px
    textAlign: "left",
  },
  paper_style:{
    width: "35%",
    padding: theme.spacing(1),
    margin: theme.spacing(3),
  },
  paper_style2:{
    width: "15%",
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
  paper_style3:{
    width: "16%",
    padding: theme.spacing(12),
    margin: theme.spacing(3),
    backgroundColor:'purple'
  },
  paper_style4:{
    width: "51.5%",
    padding: theme.spacing(12),
    margin: theme.spacing(3),
  },
}));


/*
  This is the component class

*/
function P_DASHBOARD() {

  const classes = useStyles();

  return (
    <Container maxWidth="x1" >
      <p className={classes.textStyle1} >Dashboard</p>
      <Grid
          container 
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          
          
        >    

        <Paper elevation={3} className={classes.paper_style}>

        <img src={img.default} width="50%" />
        <p className={classes.textStyle2} >Real-Time Monitoring</p>

        </Paper>
        <Paper elevation={3} className={classes.paper_style2}>

        <img src={img2.default} width="50%" />

        </Paper>            
          
        <Paper elevation={3} className={classes.paper_style2}>

        <img src={img3.default} width="50%" />

        </Paper>       
         

        <Paper elevation={3} className={classes.paper_style2}>

        <img src={img4.default} width="50%" />

        </Paper>             

        <Paper elevation={3} className={classes.paper_style3}>

        <p className={classes.textStyle3} >Graph 1</p>

        </Paper>          
        <Paper elevation={3} className={classes.paper_style3}>

        <p className={classes.textStyle3} >Graph 2</p>

        </Paper>        
        <Paper elevation={3} className={classes.paper_style4}>

        <p className={classes.textStyle3} >DATA COMPARISON</p>

        </Paper>        
      </Grid>
    </Container>
  );
  
}

export default P_DASHBOARD;
