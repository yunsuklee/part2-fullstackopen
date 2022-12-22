import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import People from './components/People'
import PersonForm from './components/PersonForm'
import personServices from './services/people'

const App = () => {
  const [people, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPeople => {
        setPerson(initialPeople)
      })
  }, [])

  const getId = () => {
    for (let i = 0; i < people.length; i++) {
      if (people[i].id !== i + 1) return i + 1
    }
    return people.length + 1
  } 

  const addPerson = (event) => {
    event.preventDefault()
    const person = people.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (person && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const changedPerson = { ...person, number: newNumber }

      personServices
        .update(changedPerson.id, changedPerson).then(returnedPerson => {
          setPerson(people.map(person => person.id !== changedPerson.id ? person : changedPerson))
        })
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: getId()
      }
  
      personServices
        .create(newPerson)
        .then(response => {
          setPerson(people.concat(newPerson))
        })
    }
      
    setNewName('')
    setNewNumber('')
  }

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

  const handlePersonDelete = (id) => {
    console.log(id)

    if (window.confirm(`Delete ${people[id - 1].name}?`)) {
      personServices
        .deletePerson(id)
        .then(response => {
          personServices
            .getAll()
            .then(initialPeople => {
              setPerson(initialPeople)
            })
        })
    }
  }

  const peopleToShow = people.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase())  
  )

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
      <People 
        peopleToShow={peopleToShow} 
        peopleDeleter={handlePersonDelete}
      />
    </div>
  )
}

export default App
