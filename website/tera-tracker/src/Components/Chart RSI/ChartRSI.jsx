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
} from '@material-ui/core';
import C_MULTICHART from '../MultiChart/MultiChart';

import { RSI } from 'technicalindicators';

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

const axis_list = [
  [0, "X axis"],
  [1, "Y axis"],
  [2, "Z axis"],
  [8, "Average Movement"],
]

class C_CHART_RSI extends React.Component {

  constructor(props){
    super(props)

    this.dataset = {data: datj}

    this.state = {
      data :  [],
      yaxis :  [],
      xaxis : [0,1,2,3,4,5,6],
      date: "0319",
      disp_x : true,
      disp_y : true,
      disp_z : true,
      current_axis: 0,
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

  compute_rsi(data, period = 6, sd = 2){

    var input = {
      period : period, 
      values : data ,
    }
      
    return RSI.calculate(input)
      
  }

  updateTable(data, newDate){
    let _st = JSON.parse(JSON.stringify(this.state))
    _st.data = []
    _st.yaxis = []

    let n = ["X","Y","Z","","","","","Average Displacement"][this.state.current_axis]

    _st.data.push({
      name: n,
      data: data.map((e) => (e[this.state.current_axis]))
    })

    _st.yaxis.push({
      title: {text: n},
    })

    let bb = this.compute_rsi(data.map((e) => (e[this.state.current_axis])))

    let l = data.length - bb.length


    _st.data.push({
      name: `${n} RSI`,
      data: [...Array(l).fill(null) ,...bb]
    })

    _st.yaxis.push({
      opposite: true,
      title: {text: `${n} RSI`},
    })

    
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

  selectAxis(event){
    this.setState({...this.state, current_axis:event.target.value}, ()=>{
      this.updateTable(this.dataset.data, this.state.date)
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
            <Grid item md={8} sm={12} className={classes.container2} >
                <Paper className={classes.paperstyle1} >
                <C_MULTICHART 
                    data={this.state.data} 
                    xaxis={this.state.xaxis} 
                    yaxis={this.state.yaxis}
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
                      <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">Axis</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={this.state.current_axis}
                          onChange={this.selectAxis.bind(this)}
                          >
                          {axis_list.map(e => (<MenuItem value={e[0]}>{e[1]}</MenuItem>)) }
                          </Select>
                      </FormControl>
                    </ListItem>
                    
                </List>
            </Grid>


        </>

    );
  }
  
  
}

export default withStyles(useStyles)(C_CHART_RSI);
