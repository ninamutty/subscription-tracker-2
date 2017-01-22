import React, { Component } from 'react';
import { Link } from 'react-router';
import Recharts, { PieChart, Pie, Sector, Cell } from 'recharts';

class CategoriesChart extends Component {
  constructor(props) {
    super(props);
    this.subscriptions = this.props.subscriptions;
    this.total = 0;
    this.state = {hover: false, data: {}, enter: {}};
    this.RenderCategoryDetails = this.RenderCategoryDetails.bind(this);
  }

  categoryData = () => {
    let categoryCount = {}
    this.subscriptions.map((subscription) => {
      if (categoryCount[subscription.category] === undefined) {
        // add in Weekly and and yearly adjustments
        categoryCount[subscription.category] = subscription.cost;

      } else {
        categoryCount[subscription.category] += subscription.cost;

      }
      this.total += subscription.cost;
    });
    return categoryCount;
    // console.log(categoryCount);
  }

  RenderCategoryDetails = () => {
    console.log("RenderCategoryDetails");
    if (this.state.hover == true) {
      console.log("In here woooo");

      let percent = `${((this.state.enter.value/this.total) * 100).toFixed(0)}%`
      let money = `$${this.state.enter.value/100.00}`

      console.log(percent);
      console.log(money);
      return (
        <div className="small-chart-modal-container">
          <h3> {this.state.enter.name} </h3>
          <p> Monthly Spending: {money} </p>
          <p> Percentage of Total Monthy Spending: {percent} </p>
        </div>
      )
    }
  }

  MouseEnters = (data, enter) => {
    console.log("MOUSE ENTER");
    // console.log(data);
    // console.log(enter.name);
    // console.log(enter.value);

    this.setState({hover: true, data: data, enter: enter});
    console.log(this.state.hover);

    // return this.RenderCategoryDetails(data, enter);
    // let percent = `${((enter.value/this.total) * 100).toFixed(0)}}%`
    // let money = `${enter.value/100.00}`
    //
    // return (
    //   <div>
    //     <h3> {enter.value} </h3>
    //     <p> Monthly Spending: {money} </p>
    //     <p> Percentage of Total Monthy Spending: {percent} </p>
    //   </div>
    // )
  }

  MouseLeaves = () => {
    console.log("MOUSE LEAVE");
    this.setState({hover: false, data: {}, enter: {}});
    console.log(this.state.hover);
  }


	render () {
    // console.log(this.subscriptions);
    let categories = this.categoryData();
    let totalNum = this.subscriptions.length;
    let i = 0;
    let data = [];

    for (var key in categories) {
      if (categories.hasOwnProperty(key)) {
        let dataCell = {
          name: key,
          value: categories[key],
          index: i
        }
        data.push(dataCell);
        i++;
      }
    }

    // const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                      // {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);

// textAnchor={x > cx ? 'start' : 'end'}

// <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
//   { name + ":  " }
//   {`${(percent * 100).toFixed(0)}%`}
// </text>
      return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          { name }
        </text>
      );
    };

    // const clickPieSlice = () => {
    //   return (
    //     console.log("CLICK!")
    //   )
    // }

  	return (
      <div className="big-div-categories-chart">
      {this.RenderCategoryDetails()}
    	<PieChart width={700} height={400} onMouseEnter={this.onPieEnter} className="piechart-container">
        <Pie
          data={data}
          cx={350}
          cy={200}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          onClick={clickPieSlice}
          onMouseEnter={this.MouseEnters.bind(this, data)}
          onMouseLeave={this.MouseLeaves.bind(this)}
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      </div>
    );
  }
}


export default CategoriesChart;
