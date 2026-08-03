const Statistics = (props) => {

    let good = props.good
    let neutral = props.neutral
    let bad = props.bad
    let totalFeedback = good + neutral + bad
    let hasFeedback = totalFeedback > 0


    return (


        <>

            {!hasFeedback ? <p>No feedback yet</p> :
                <div>
                    <h2>Statistics</h2>
                    <p>good {good}</p>
                    <p>neutral {neutral}</p>
                    <p>bad {bad}</p>
                    <p>all {totalFeedback}</p>
                    <p>average {(good - bad) / (totalFeedback)}</p>
                    <p>positive {good / (totalFeedback) * 100}%</p></div>}
        </>
    )
}

export default Statistics