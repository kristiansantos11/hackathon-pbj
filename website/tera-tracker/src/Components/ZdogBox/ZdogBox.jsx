import React from 'react'

import { Illustration, Rect, Box, Anchor } from 'react-zdog'

const dir = require('./get_sample.json')
const dir2 = require('./get_sample2.json')
const dir3 = require('./get_sample3.json')

class C_ZDOGBOX extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      x : dir[0][0],
      y : dir[0][1],
      z : dir[0][2],

    }
    this.i = 1
  }

  componentDidMount(){
    
    let mult = 100
    let delay = 150

    setInterval(() => {
      this.setState({
        ...this.state, 
        x: Math.abs(dir[this.i][0]*mult),
        y: Math.abs(dir[this.i][1]*mult),
        z: Math.abs(dir[this.i][2]*mult),
      })
      this.i += 1
      this.i %= dir.length
    }, delay)
  }
  
  render(){
    return (
      <div style={{height:"300px"}}>
          <Illustration zoom={13}>
              <Box 
                  width={15} 
                  height={15} 
                  depth={15} 
                  translate={{y:-10}}
                  color= "none"
                  bottomFace= '#00a'
                  rotate={{ 
                  x: 0.3 + this.state.x,
                  y: -0.5 + this.state.y,
                  z: 0 + this.state.z,
                  }} />
          </Illustration>
          <p>{this.i}/{dir.length} || Visualization of Movement with 100x Magnification</p>
        </div>
    );
  }
  
}

export default C_ZDOGBOX;
