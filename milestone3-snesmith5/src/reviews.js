/* eslint no-undef: 0, no-unused-expressions: 0*/

function Review({ review }) {

    function handleClick(comment_id) {
        fetch('http://192.168.1.185:4444/rate?', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ratings: data })

        }).then(response => response.text()).then(data => { alert(data) })

        if (ratings !== null) {
            return ratings;
        }
    }

    return (
        <div>
            <p>Here is your new input {review.username}</p>
            {/* <button onClick={handleClick => setRatings(ratings)}>
      Update
    </button> */}

            {/* // when user clicks call setinput with a new value
// react re-renders comment component pasing new input to it
    */}
            <button onClick={handleClick}>Delete Review</button>
            <p>{review.username}</p>
        </div>
    )
}
export default Review;