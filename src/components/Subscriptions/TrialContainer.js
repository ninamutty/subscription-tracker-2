import React, { Component } from 'react';
import Trial from './Trial';

class TrialContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let trialList = this.props.trials;
    let trials = trialList.map((trial) => {
      return <Trial name={trial.name}
                     cost={trial.cost}
                     category={trial.category}
                     firstBillDate={trial.firstBillDate}
                     id={trial._id}
                     key={trial._id}
                     onClick={this.props.onClick}
                     setSelectState={this.props.setSelectState} />
    });
    return (
      <div className="trials-container">
        <ul className="trial-container">
          {trials}
        </ul>
      </div>
    );
  }
}


export default TrialContainer;
