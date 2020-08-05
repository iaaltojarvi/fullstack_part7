import React from 'react'

const Country = ({ country }) => {
    if (country && country !== 'Not found') {
        country = country[0]
        return (
            <>
                <h3>{country.name} </h3>
                <div>Capital:  {country.capital} </div>
                <div>Population:  {country.population}</div>
                <br></br>
                <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
            </>
        )
    } else if (country === 'Not found') {
        return (
            <div>
                Not found...
            </div>
        )
    } else {
        return null
    }
}

export default Country