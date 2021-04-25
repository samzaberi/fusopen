const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {

  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {

  return (
    <div>
      <Part part={props.cont.part1} exercises={props.cont.exercises1} />
      <Part part={props.cont.part2} exercises={props.cont.exercises2} />
      <Part part={props.cont.part3} exercises={props.cont.exercises3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'


  const content = {
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content cont={content} />
      <Total total={content.exercises1 + content.exercises2 + content.exercises3} />
    </div>

  )
}

export default App;
