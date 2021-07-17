import React from 'react';

import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import { 
  Typography, 
  Grid, 
  List, 
  ListSubheader, 
  ListItem, 
  ListItemText,
  Container,
} from '@material-ui/core';
import C_CHART from '../../Components/Chart/Chart';
import C_CHART_BOLLINGER from '../../Components/Chart Bollinger/ChartBollinger';
import C_CHART_RSI from '../../Components/Chart RSI/ChartRSI';
import C_CHART_LOWHIGH from '../../Components/Chart LowHigh/ChartLowHigh';

const useStyles  = theme => ({
  container_leo: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  container_leo1: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(20),
  },
  container_leo2: {
    padding: theme.spacing(1  ),
    height: "100%",
  },
});


class P_DASHBOARD extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    const { classes } = this.props;
    return (
      <Container maxWidth="lg" className={classes.container_leo1} >
        <Typography variant="h3" style={{padding:"1rem"}}>
          USHER ERI Detailed Graph Analysis
        </Typography>

        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            
            <C_CHART />

          
        </Grid>

        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">

            <Grid item style={{paddingTop: "2.5%"}} md={12}>
              <Typography variant="h3">Bollinger Chart</Typography>
              <p>Gives a technical insight about the moving average along with standard deviation of the graph</p>
              <p>Drag your mouse on the group to zoom in to specific time of the date</p>
            </Grid>

            <C_CHART_BOLLINGER />
          
        </Grid>

        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            
            <Grid item style={{paddingTop: "5%"}} md={12}>
              <Typography variant="h3">RSI Chart</Typography>
              <p>Gives the volatity of movement of the graph. The graph should only run between 30% and 70% only and else, the accelerometer change is significant.</p>
              <p>Drag your mouse on the group to zoom in to specific time of the date</p>
            </Grid>

            <C_CHART_RSI />
          
        </Grid>

        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">

            <Grid item style={{paddingTop: "5%"}} md={12}>
              <Typography variant="h3">Lowest-Highest Point Chart</Typography>
              <p>Gives the most positive and most negative movement of an accelerometer axis.</p>
              <p>Drag your mouse on the group to zoom in to specific time of the date</p>
            </Grid>

            <C_CHART_LOWHIGH />
          
        </Grid>

      </Container>
    );
  }
  
  
}

export default withStyles(useStyles)(P_DASHBOARD);
