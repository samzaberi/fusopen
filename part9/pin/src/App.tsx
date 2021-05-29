import React from 'react';

const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>
}

interface course {
  name: string,
  exerciseCount: number
}

interface courseProps {
  courses: Array<course>
}


const Content = ({ courses }: courseProps) => {
  return (
    <div>
      {
        courses.map(c =>
          <p key={c.name}>{c.name} {c.exerciseCount}</p>
        )
      }
    </div>

  )
}

const Total = ({ courses }: courseProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div >
  );
};

export default App;
