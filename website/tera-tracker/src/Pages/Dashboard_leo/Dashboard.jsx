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
import P_DASHBOARD_CONTENT from '../Dashboard/Dashboard';


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
         DATA ANALYSIS
        </Typography>
        
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">

            <C_CHART />
          
        </Grid>

        <P_DASHBOARD_CONTENT/>

        
      </Container>
    );
  }
  
  
}

export default withStyles(useStyles)(P_DASHBOARD);
