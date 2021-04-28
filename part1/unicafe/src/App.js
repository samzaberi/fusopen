import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return (
    [
      <td>{props.text} </td>,
      <td>{props.value} </td>

    ]

  )
}

const Statistics = (props) => {
  const sum = props.good + props.bad + props.neutral

  const avg = () => (props.good + (-1 * props.bad)) / sum
  const postive = () => (props.good / sum) * 100

  if (sum === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <Statistic text="good" value={props.good} />
          </tr>
          <tr>
            <Statistic text="neutral" value={props.neutral} />
          </tr>
          <tr>
            <Statistic text="bad" value={props.bad} />
          </tr>
          <tr>
            <Statistic text="all" value={sum} />
          </tr>
          <tr>
            <Statistic text="average" value={avg()} />
          </tr>
          <tr>
            <Statistic text="positive" value={postive()} />
          </tr>
        </tbody>
      </table>

    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App;
