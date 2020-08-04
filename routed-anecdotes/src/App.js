import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import CreateNew from './components/CreateNew';
import About from './components/About';
import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Notification from './components/Notification';


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`You added '${anecdote.content}'`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Router>
        <Menu />
        <Notification message={notification} />
        <Switch>
          <Route path='/new'>
            <CreateNew addNew={addNew} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route exact path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route exact path='/:id'>
            <Anecdote anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router >
      <Footer />
    </div>
  )
}

export default App;
