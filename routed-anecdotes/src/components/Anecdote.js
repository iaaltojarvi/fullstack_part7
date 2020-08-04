import React from 'react'
import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === id)
    console.log(id, anecdote, anecdotes)
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <div>{anecdote.author}</div>
            <div>{`Votes: ${anecdote.votes}`}</div>
            <div>{`For more info: ${anecdote.info}`}</div>
        </div>
    )
}

export default Anecdote