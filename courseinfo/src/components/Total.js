const Total = ({ parts }) => {
  console.log(parts);
  return (
    <b>
      total of {parts.reduce((acc, part) => {
        return acc + part.exercises
      }, 0)} exercises
    </b>
  )
}

export default Total