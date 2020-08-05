import React from 'react'

const Country = ({ country }) => {
    if (country && country !== 'Not found') {
        country = country[0]
        return (
            <>
                <h3>{country.name} </h3>
                <div>capital {country.capital} </div>
                <div>population {country.population}</div>
                <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
            </>
        )
    } else if (country === 'Not found') {
        return (
            <div>
                not found...
            </div>
        )
    } else {
        return null
    }
}

export default Country