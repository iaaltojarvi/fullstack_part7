import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <h1>Software anecdotes</h1>
            <Link style={padding} to='/'>Anecdotes</Link>
            <Link style={padding} to='/new'>Create new</Link>
            <Link style={padding} to='/about'>About</Link>
        </div>
    )
}

export default Menu