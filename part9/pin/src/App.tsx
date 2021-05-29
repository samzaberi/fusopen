import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescPart extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CourseWithDescPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

// interface course {
//   name: string,
//   exerciseCount: number
// }

// interface courseProps {
//   courses: Array<course>
// }

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>
}

const CourseDetails = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case "normal":
      return (
        <div>
          <p>{course.name}<br />
            {course.type}<br />
            {course.description}<br />
            {course.exerciseCount}</p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p>{course.name}<br />
            {course.type}<br />
            {course.exerciseCount}<br />
            {course.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p>{course.name}<br />
            {course.type}<br />
            {course.exerciseCount}<br />
            {course.exerciseSubmissionLink}</p>
        </div>
      )
    default:
      return assertNever(course);
  }
}


const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {
        courses.map(c =>
          <CourseDetails key={c.name} course={c} />
        )
      }
    </div>

  )
}

const Total = ({ courses }: { courses: CoursePart[] }) => {
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
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
