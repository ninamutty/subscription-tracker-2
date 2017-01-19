import React, { Component } from 'react';
import Trial from './Trial';

class TrialContainer extends Component {
  render() {
    let trialList = this.props.trials;
    let trials = trialList.map((trial) => {
      return <Trial name={trial.name}
                     cost={trial.cost}
                     category={trial.category}
                     firstBillDate={trial.firstBillDate}
                     key={trial._id} />
    });
    return (
      <div>
        <h2> Trials </h2>
        <ul className="trial-container">
          {trials}
        </ul>
      </div>
    );
  }
}

export default TrialContainer;
