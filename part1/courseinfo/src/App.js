import React from 'react'

import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  var total = course.parts.reduce(function(a, b){
    return a + b.exercises;
  }, 0);

  return (
    <div>
      <Header header={course.name}></Header>
      <Content parts={course.parts}/>
      <Total total={total}></Total>
    </div>
  )
}

export default App
