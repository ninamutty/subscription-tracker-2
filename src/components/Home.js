import React from 'react';

const Home = props => {
  console.log(props);
  console.log(props.params.user_id);

  var userID = props.params.user_id ;

  console.log(userID);
  return (
    <div className="Home">
      <h1> WELCOME TO HOME </h1>
      <p> {userID} </p>
    </div>
  );
}

export default Home;
