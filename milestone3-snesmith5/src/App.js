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
function comment() {
  // declare new state variable
  // calling it input because it holds userInput (comments/ratings)
  // setInput allows us to update the input
  const [input, setInput] = useState(input);

  // userEffect tells react to do 'something' after every render
  useEffect(() => {
    // displays after every render
    document.title = `Here is your new input ${input}`
  });
  // comment_list = Map(comment, input);

  return
  (
    // when user clicks call setinput with a new value
    // react re-renders comment component pasing new input to it
    <div>
      <p>Here is your new input {input}</p>
      <button onClick={() => setInput(input)}>
        Update
      </button>
    </div>
  )
};


export default App;
