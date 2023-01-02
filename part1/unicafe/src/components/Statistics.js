import React from 'react'
import StatisticLine from './StatisticLine';

const Statistics = ({ good, neutral, bad }) => {
  var all = good + neutral + bad;
  var average = (good - bad) / all;
  var positive = good / all * 100;

  if (all > 0) {
    return (
        <>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text="good" value={good}></StatisticLine>
                    <StatisticLine text="neutral" value={neutral}></StatisticLine>
                    <StatisticLine text="bad" value={bad}></StatisticLine>
                    <StatisticLine text="all" value={all}></StatisticLine>
                    <StatisticLine text="average" value={average}></StatisticLine>
                    <StatisticLine text="positive" value={`${positive}%`}></StatisticLine>
                </tbody>
            </table>
        </>
    )
  } else {
    return (
        <>
            <h1>Statistics</h1>
            <p>No feedback given</p>
        </>
    )
  }
}

export default Statistics