import { useState } from 'react';

export const useField = (type) => {
    const [value, setValue] = useState('')
    let input = {}

    const onChange = (event) => {
        input.name = setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        input,
        reset
    }
}
