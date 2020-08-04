import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const InputNoResetProp = ({reset, ...props}) => <input {...props} />

const CreateNew = (props) => {
    const history = useHistory()

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        history.push('/')
    }

    const handleReset = () => {
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Content
          <InputNoResetProp {...content} />
                </div>
                <div>
                    Author
          <InputNoResetProp {...author} />
                </div>
                <div>
                    Url for more info
          <InputNoResetProp {...info} />
                </div>
                <button>Create</button>
            </form>
            <button onClick={handleReset}>Reset</button>
        </div>
    )

}

export default CreateNew