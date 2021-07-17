import React from 'react'

import Chart from "react-apexcharts";

class C_MULTICHART extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: this.props.xaxis
            }
          },
          series: this.props.data
        };
    }

    render(){
        return (
            <Chart
                options={{
                    chart: {
                      id: "basic-bar"
                    },
                    xaxis: {
                      categories: this.props.xaxis
                    },
                    yaxis: this.props.yaxis,
                  }}
                series={this.props.data}
                
                type="line"
                height={this.props.height || "250px"}
                width={this.props.width || "250px"}
            />
        )
    }
}

export default C_MULTICHART