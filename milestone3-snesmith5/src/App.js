import logo from './logo.svg';
import './App.css';
// import useState Hook -- lets us keep local state function component
import React, { useState, useEffect } from 'react'

//function used to retrieve data from python file
function getJSON() {

  fetch('/rate')
    .then(response => response.json())
    .then(data => setYourLine(data));
  // this.setline("Button clicked");
  console.log(data);
}
// userEffect tells react to do 'something' after every render
useEffect(() => {
  // displays after every render
  document.title = `Here is your new input ${ratings}`
})
  ;
// comment_list = Map(comment, input);
// declare new state variable
// calling it input because it holds userInput (comments/ratings)
// setInput allows us to update the input
const [ratings, setRatings] = useState([]);
Map(ratings => {


  return (
    // when user clicks call setinput with a new value
    // react re-renders comment component pasing new input to it
    <div>
      <p>Here is your new input {ratings}</p>
      <button onClick={() => setInput(ratings)}>
        Update
      </button>

    </div>
  )
}


);
export default App;
