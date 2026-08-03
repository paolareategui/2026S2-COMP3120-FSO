import Header from './components/header'
import Content from './components/content'
import Total from './components/total'


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {part1.name} exercises1 = {part1.exercises1} part2 = {part2.name} exercises2 = {part2.exercises2} part3 = {part3.name} exercises3 = {part3.exercises3}/>
      <Total exercises1 = {part1.exercises1} exercises2 = {part2.exercises2} exercises3 = {part3.exercises3}/>
    </div>
  )
}

export default App