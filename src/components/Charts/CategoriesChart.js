import React, { Component } from 'react';
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
      let cost;
      if (subscription.billingCycle == "Weekly") {
        cost = subscription.cost * 4;
      } else if (subscription.billingCycle == "Yearly") {
        cost = subscription.cost / 12;
      } else if (subscription.billingCycle == "Monthly") {
        cost = subscription.cost
      }

      if (categoryCount[subscription.category] === undefined) {
        categoryCount[subscription.category] = cost;
        this.total += cost;
      } else {
        categoryCount[subscription.category] += cost;
        this.total += cost;
      }
    });
    return categoryCount;
  }

  RenderCategoryDetails = () => {
    if (this.state.hover == true) {
      let percent = `${((this.state.enter.value/this.total) * 100).toFixed(2)}%`
      let money = `$${this.state.enter.value/100.00}`
      let spendingPerYear = `$${(this.state.enter.value * 12)/100.00}`

      this.total = 0;
      return (
        <div className="small-chart-modal-container">
          <h2> {this.state.enter.name} </h2>
          <p> <span className="details-title"> Monthly Cost: </span> {money} </p>
          <p> <span className="details-title"> Yearly Cost: </span> {spendingPerYear} </p>
          <p> <span className="details-title"> Percentage of Total Spending: </span> {percent} </p>
        </div>
      )
    }
  }

  MouseEnters = (data, enter) => {
    this.total = 0;
    this.setState({hover: true, data: data, enter: enter});
  }

  MouseLeaves = () => {
    this.total = 0;
    this.setState({hover: false, data: {}, enter: {}});
  }


	render () {
    let categories = this.categoryData();
    let totalNum = this.subscriptions.length;
    let i = 0;
    let data = [];

    for (var categoryKey in categories) {
      if (categories.hasOwnProperty(categoryKey)) {
        let dataCell = {
          name: categoryKey,
          value: categories[categoryKey],
          index: i,
          key: i,
          total: this.total
        }
        data.push(dataCell);
        i++;
      }
    }

    const COLORS = ["#CAD8E7", "#95A5C3", "#91677E", "#FE9E95", "#C97C7E", "#FEDAB3", "#C37E8A", "#F4C8A4"];

    const RADIAN = Math.PI / 180

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          { name }
        </text>
      );
    };

  	return (
      <div className="big-div-categories-chart">
        {this.RenderCategoryDetails()}
    	  <PieChart width={520} height={350} onMouseEnter={this.onPieEnter} className="piechart-container">
         <Pie
            isAnimationActive={false}
            data={data}
            cx={260}
            cy={175}
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            onMouseEnter={this.MouseEnters.bind(this, data)}
            onMouseLeave={this.MouseLeaves.bind(this)}
            onClick={this.props.onClick.bind(this, data)}
          >
      	    {
        	    data.map((entry, index, key) => <Cell fill={COLORS[index % COLORS.length]} key={key}/>)
            }
          </Pie>
        </PieChart>
      </div>
    );
  }
}


export default CategoriesChart;
