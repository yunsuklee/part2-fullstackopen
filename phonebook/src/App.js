import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'

const App = (props) => {
  const [people, setPerson] = useState(props.people)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const peopleToShow = people.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase())  
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    for(let person of people) {
      if (person.name.toLowerCase() === personObject.name.toLowerCase()) {
        setNewName('')
        setNewNumber('')
        return alert(`${newName} is already added to phonebook`)
      }
    }

    setPerson(people.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <People peopleToShow={peopleToShow} />
    </div>
  )
}

export default App
