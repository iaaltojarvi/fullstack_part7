import React, { useState } from 'react'
import { useCountry, useField } from './hooks/index';
import Country from './components/Country'

const App = () => {
  const [name, setName] = useState('')
  const nameInput = useField('text')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App