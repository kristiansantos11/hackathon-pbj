import React from 'react';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import { Grid, Paper } from '@material-ui/core';
import axios from 'axios';

const img = require('./building.png')
const img2 = require('./1.png')
const img3 = require('./2.png')
const img4 = require('./3.png')

const useStyles =(theme) => ({
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
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  paper_style2:{
    padding: "2%",
    height: "10%",
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
})


/*
  This is the component class

*/
class P_DASHBOARD_CONTENT extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      Name : "loading...",
      Location : "loading...",
      Type : "loading...",
      Storeys : "loading...",
      Built : "loading...",
      Framing : "loading...",
      Sensors: []
    }
  }

  componentDidMount(){
    this.fetchBuildingDat()
    this.fetchBuildingSensors()
  }

  
  async fetchBuildingDat(){

    let dat = await axios(`https://nyawit.pythonanywhere.com/building/1`)

    dat = dat.data[0]

    console.log(dat)
    this.setState({...this.state, 
      Name : dat["name"],
      Location : dat["city"],
      Type : dat["type"],
      Storeys : dat["storeys"],
      Built : dat["year_built"],
      Framing : dat["structural_framing"],
    })
    
  }

  async fetchBuildingSensors(){

    let dat = await axios(`https://nyawit.pythonanywhere.com/building/1/sensors`)

    dat = dat.data

    console.log(dat)
    this.setState({...this.state, 
      Sensors: dat
    })
    
  }

  render(){
    const { classes } = this.props;

    return (
        <Container maxWidth="x1" >

          <Grid
              container 
              direction="row"
              justifyContent="center"
              alignItems="center"
            >    

            <Grid item sm={12} md={6}>

                <Paper elevation={3} className={classes.paper_style}>

                  <Grid
                      container 
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    > 
                    <Grid item md="12">
                      <p className={classes.textStyle2} >Building Information</p>
                    </Grid>
                    <Grid item md="6">
                      <img src={img.default} width="100%" />
                    </Grid>
                    <Grid item md="6">
                      <Container>
                        <h3>Building Name</h3>
                        <p>{this.state.Name}</p>

                        <h3>Location</h3>
                        <p>{this.state.Location}</p>

                        <h3>Building Type</h3>
                        <p>{this.state.Type}</p>

                        <h3>Storeys</h3>
                        <p>{this.state.Storeys}</p>

                        <h3>Year Built</h3>
                        <p>{this.state.Built}</p>

                        <h3>Structural Framing</h3>
                        <p>{this.state.Framing}</p>
                      </Container>
                    </Grid>
                    
                  </Grid>

                </Paper>
            </Grid>
            
            <Grid item md={6}>
              
              <Grid
                container 
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
              >    
                {
                  this.state.Sensors.map((e,i) => (
                    <Grid item xl={6}>
                      <Paper elevation={3} className={classes.paper_style2}>
                        <Grid
                            container 
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                          >   
                            <Grid item md={3}>
                              <img src={img4.default} width="100%" />
                            </Grid>
                            <Grid item md={9}>
                              <h2>Name: {e["name"]}</h2>
                              <p>Description: {e["description"]}</p>
                              <p>Room Height: {e["room_height"]}</p>
                            </Grid>
                        </Grid>
                      </Paper>  
                    </Grid>
                  ))
                }
              </Grid>

            </Grid>
                
            

          </Grid>
        </Container>
      );
  }
  
}

export default withStyles(useStyles)(P_DASHBOARD_CONTENT);
