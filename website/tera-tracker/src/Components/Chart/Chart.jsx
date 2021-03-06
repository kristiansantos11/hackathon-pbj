import React from 'react';

import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import { 
  Paper, 
  Grid, 
  List, 
  ListSubheader, 
  ListItem, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import C_LINECHART from '../../Components/LineChart/LineChart';
import P_DASHBOARD_CONTENT from '../../Pages/Dashboard/Dashboard';

const useStyles  = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  container2: {
    padding: theme.spacing(1  ),
    height: "100%",
  },
  paperstyle1: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary[50],
  },
  paper: {
    width: '100%',
    height: '100%',
    backgroundColor: "transparent",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
});

const datj = require('./0319.json')

/*
  This is the component class
*/

const time = [12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12]

const date_av = [
  ["0319", "March 19, 2021"],
  ["0320", "March 20, 2021"],
  ["0321", "March 21, 2021"],
  ["0322", "March 22, 2021"],
  ["0323", "March 23, 2021"],
  ["0324", "March 24, 2021"],
  ["0325", "March 25, 2021"],
]

class C_CHART extends React.Component {

  constructor(props){
    super(props)

    this.dataset = {data: datj}

    this.state = {
      data :  [],
      xaxis : [0,1,2,3,4,5,6],
      date: "0319",
      disp_x : true,
      disp_y : true,
      disp_z : true,
      disp_dx : false,
      disp_dy : false,
      disp_dz : false,
      disp_dave : false,
      current_sensor: 1,
      current_building: 1,
      sensor_list: [],
      building_ling: [],
    }
  }

  async componentDidMount(){
    //let dat = await axios("https://nyawit.pythonanywhere.com/sensors/1/raw/0319")
    let dat = {data: datj}

    this.fetchBuildings()
    this.fetchFloors()
    this.updateTable(dat.data, "0319")
    
  }

  async fetchBuildings(){

    let dat = await axios(`https://nyawit.pythonanywhere.com/building`)

    dat = dat.data

    this.setState({...this.state, building_ling: dat})
    
  }

  async fetchFloors(){

    let dat = await axios(`https://nyawit.pythonanywhere.com/building/${this.state.current_building}/sensors`)

    dat = dat.data

    this.setState({...this.state, sensor_list: dat})

    return dat
    
  }

  async loadDataFromServer(dateIn){
    let dat = await axios(`https://nyawit.pythonanywhere.com/sensors/${this.state.current_sensor}/${dateIn}/raw`)

    this.dataset = dat
    this.updateTable(dat.data, dateIn)
  }

  updateTable(data, newDate){
    let _st = JSON.parse(JSON.stringify(this.state))
    _st.data = []
    for(let i=0; i<7;i++){
      if (this.state[`disp_${["x","y","z","dx","dy","dz","dave"][i]}`]){
        _st.data.push({
          name: ["X","Y","Z","X displacement","X displacement","Y displacement","Z displacement","Average Displacement"][i],
          data: data.map((e) => (e[[0,1,2,5,6,7,8][i]]))
        })
      }
    }

    data.map((e) => (e.slice(3,4)))
    
    _st.date = newDate
    _st.xaxis = data.map((e) => `${String(time[e[3]]).padStart(2,"0")}:${String(e[4]).padStart(2,"0")} ${e[3] < 12 ? "AM" : "PM"}`)

    this.setState(_st)
  }

  selectDate(event){
    this.loadDataFromServer(event.target.value)
  };

  selectSensor(event){
    this.setState({...this.state, current_sensor:event.target.value}, ()=>{
      this.loadDataFromServer(this.state.date)
    })
    
  };

  selectBuilding(event){
    this.setState({...this.state, current_sensor:0 ,current_building:event.target.value}, ()=>{
      let ret = this.fetchFloors()
      this.selectSensor({target: {value: ret[0].id}})
    })
    
  };

  checkChange(event){
    this.setState({ ...this.state, [event.target.name]: event.target.checked }, ()=> {
      this.updateTable(this.dataset.data, this.state.date)
    });
  }
  
  render(){
    const { classes } = this.props;
    return (
        <>
            <P_DASHBOARD_CONTENT />

            <Grid item style={{paddingTop: "5%"}} md={12}>
              <Typography variant="h3">Accelerometer Chart</Typography>
              <p>Gives the timeline history of the movements of the accelerometer installed in the USHER ERI</p>
              <p>Drag your mouse on the group to zoom in to specific time of the date</p>
            </Grid>

            <Grid item md={8} sm={12} className={classes.container2} >
                <Paper className={classes.paperstyle1} >
                <C_LINECHART 
                    data={this.state.data} 
                    xaxis={this.state.xaxis} 
                    height={"400px"}
                    width="100%"
                    />

                </Paper>
            </Grid>
            
            <Grid item xs={4} className={classes.container2} >
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Dataset Source
                    </ListSubheader>
                    }
                    className={classes.paper}
                >
                    <ListItem>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="building-from-select-label">Building</InputLabel>
                        <Select
                        labelId="building-from-select-label"
                        id="building-from-select"
                        value={this.state.current_building}
                        onChange={this.selectBuilding.bind(this)}
                        >
                        {this.state.building_ling.map(e => (<MenuItem value={e["id"]}>{e["name"]}</MenuItem>)) }
                        </Select>
                    </FormControl>
                    </ListItem>
                    
                    <ListItem>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="sensor-from-select-label">Sensor From</InputLabel>
                        <Select
                        labelId="sensor-from-select-label"
                        id="sensor-from-select"
                        value={this.state.current_sensor}
                        onChange={this.selectSensor.bind(this)}
                        >
                        {this.state.sensor_list.map(e => (<MenuItem value={e["id"]}>{e["name"]}</MenuItem>)) }
                        </Select>
                    </FormControl>
                    </ListItem>
                    
                    <ListItem>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Date</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.date}
                        onChange={this.selectDate.bind(this)}
                        >
                        {date_av.map(e => (<MenuItem value={e[0]}>{e[1]}</MenuItem>)) }
                        </Select>
                    </FormControl>
                    </ListItem>
                    
                    <ListItem>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Orientation Displayed on Graph</FormLabel>
                        <FormGroup>
                          <FormControlLabel
                              control={<Checkbox checked={this.state.disp_x} onChange={this.checkChange.bind(this)} name="disp_x" />}
                              label="Display X Graph"
                          />
                          <FormControlLabel
                              control={<Checkbox checked={this.state.disp_y} onChange={this.checkChange.bind(this)} name="disp_y" />}
                              label="Display Y Graph"
                          />
                          <FormControlLabel
                              control={<Checkbox checked={this.state.disp_z} onChange={this.checkChange.bind(this)} name="disp_z" />}
                              label="Display Z Graph"
                          />
                          {/*
                          <FormControlLabel
                              control={<Checkbox checked={this.state.disp_dx} onChange={this.checkChange.bind(this)} name="disp_dx" />}
                              label="Display dX Graph"
                          />
                          <FormControlLabel
                              control={<Checkbox checked={this.state.disp_dy} onChange={this.checkChange.bind(this)} name="disp_dy" />}
                              label="Display dY Graph"
                          />
                          <FormControlLabel
                              control={<Checkbox checked={this.state.disp_dz} onChange={this.checkChange.bind(this)} name="disp_dz" />}
                              label="Display dZ Graph"
                          />
                          */}
                          <FormControlLabel
                              control={<Checkbox checked={this.state.disp_dave} onChange={this.checkChange.bind(this)} name="disp_dave" />}
                              label="Display dAverage Graph"
                          />
                        </FormGroup>
                    </FormControl>
                    </ListItem>
                </List>
            </Grid>
        </>

    );
  }
  
  
}

export default withStyles(useStyles)(C_CHART);
