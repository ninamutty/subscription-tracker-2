import React, { Component } from 'react';
import { Link } from 'react-router';
import Recharts, { PieChart, Pie, Sector, Cell } from 'recharts';

class CategoriesChart extends Component {
  constructor(props) {
    super(props);
    this.subscriptions = this.props.subscriptions;
  }

  categoryData = () => {
    let categoryCount = {}
    this.subscriptions.map((subscription) => {
      if (categoryCount[subscription.category] === undefined) {
        categoryCount[subscription.category] = 1;
      } else {
        categoryCount[subscription.category] += 1;
      }
    });
    return categoryCount;
    // console.log(categoryCount);
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
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          { name + ":  " }
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

  	return (
    	<PieChart width={600} height={400} onMouseEnter={this.onPieEnter} className="piechart-container">
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}


export default CategoriesChart;
