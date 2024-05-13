import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';


const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      name
      emoji
    }
  }
`;

function CountryList() {
    const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <ul className='ul-list'>
                {data.countries.map((country, index) => (
                    <li key={index}>
                        <p className='countryName'>{country.name}</p>
                        <p className='emoji'>{country.emoji}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CountryList;