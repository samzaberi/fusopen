import React from 'react'

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Part = (props) => {
    return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    // console.log(parts)
    const sum = parts.reduce((total, part) => {
        return total + part.exercises
    }, 0)
    // console.log(sum)

    return <p><strong>Total of {sum} excercises</strong></p>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Courses = ({ courses }) => {
    return (
        <div>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}

export default Courses