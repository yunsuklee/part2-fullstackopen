import Person from './Person'

const People = ({ peopleToShow }) => (
  <div>
    {peopleToShow.map(person =>
      <Person key={person.id} person={person} />
    )}
  </div>
)

export default People