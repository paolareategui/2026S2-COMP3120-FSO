import { useState } from 'react'
import Statistics from './components/statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => setGood(good + 1)
  const handleNeutralFeedback = () => setNeutral(neutral + 1)
  const handleBadFeedback = () => setBad(bad + 1)


  return (
    <>
      <h1>Give Feedback</h1>

      <button onClick={() => handleGoodFeedback()}>good</button>
      <button onClick={() => handleNeutralFeedback()}>neutral</button>
      <button onClick={() => handleBadFeedback()}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />


      <h2>Statistics</h2>
    </>
  )

}

export default App