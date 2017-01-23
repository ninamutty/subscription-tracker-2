import React, { Component } from 'react';
import Recharts, { PieChart, Pie, Sector, Cell } from 'recharts';


class CategoryClass extends Component {
  constructor(props) {
    super(props)
    this.subscriptions = this.props.subscriptions;
    this.clickName = this.props.clickName;
    this.total = 0;
    this.categoryTotal = 0;
    this.state = {hover: false, data: {}, enter: {}};
    this.RenderCategoryDetails = this.RenderCategoryDetails.bind(this);
  }

  categoryData = () => {
    let categorySubscriptions = {}
    this.subscriptions.map((subscription) => {
      let cost;
      if (subscription.billingCycle == "Weekly") {
        cost = subscription.cost * 4;
      } else if (subscription.billingCycle == "Yearly") {
        cost = subscription.cost / 12;
      } else if (subscription.billingCycle == "Monthly") {
        cost = subscription.cost
      }

      if (subscription.category == this.props.clickName) {
        if (categorySubscriptions[subscription.name] === undefined) {
          categorySubscriptions[subscription.name] = cost;
          this.categoryTotal += cost;
        } else {
          categorySubscriptions[subscription.name] += cost;
          this.categoryTotal += cost;
        }
      }
    });
    return categorySubscriptions;
  }

  RenderCategoryDetails = () => {
    if (this.state.hover == true) {
      let categoryPercent = `${((this.state.enter.value/this.categoryTotal) * 100.00).toFixed(2)}%`
      let money = `$${this.state.enter.value/100.00}`
      let totalPercent = `${((this.state.enter.value/this.props.totalSpend) * 100.00).toFixed(2)}%`

      this.categoryTotal = 0;
      return (
        <div className="small-chart-modal-container">
          <h3> {this.state.enter.name} </h3>
          <p> Monthly Cost: {money} </p>
          <p> Percentage of Monthy Spending in {this.clickName}: {categoryPercent} </p>
          <p> Percentage of Total Monthly Spending: {totalPercent} </p>
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

    for (var categoriesKey in categories) {
      if (categories.hasOwnProperty(categoriesKey)) {
        let dataCell = {
          name: categoriesKey,
          value: categories[categoriesKey],
          index: i,
          key: i
        }
        data.push(dataCell);
        i++;
      }
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;

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
      <div className="big-div-one-category-chart">
        {this.RenderCategoryDetails()}
    	  <PieChart width={400} height={400} onMouseEnter={this.onPieEnter} className="piechart-container">
         <Pie
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
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

export default CategoryClass;
