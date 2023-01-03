import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  return (
    <p>
        {parts.map(part => {
            return <Part name={part.name} key={part.id} exercises={part.exercises}></Part>
        })}
    </p>
  )
}

export default Content