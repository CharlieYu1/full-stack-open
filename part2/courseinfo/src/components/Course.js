import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {

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

export default Course