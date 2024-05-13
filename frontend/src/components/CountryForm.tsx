import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { GET_ALL_COUNTRIES } from './CountryList'; // Importez la requête GraphQL pour obtenir tous les pays

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      emoji
    }
  }
`;

function CountryForm() {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        emoji: '',
        // Ajoutez d'autres champs si nécessaire
    });

    const [addCountry] = useMutation(ADD_COUNTRY, {
        update(cache, { data: { addCountry } }) {
            // Mise à jour du cache pour inclure le nouveau pays ajouté
            cache.modify({
                fields: {
                    countries(existingCountries = []) {
                        const newCountryRef = cache.writeFragment({
                            data: addCountry,
                            fragment: gql`
                fragment NewCountry on Country {
                  id
                  name
                  emoji
                }
              `,
                        });
                        return [...existingCountries, newCountryRef];
                    },
                },
            });
        },
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCountry({
                variables: { data: formData },
            });
            setFormData({
                name: '',
                code: '',
                emoji: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} />
            <input type="text" name="code" placeholder="Code" value={formData.code} onChange={handleChange} />
            <input type="text" name="emoji" placeholder="Emoji" value={formData.emoji} onChange={handleChange} />
            <button type="submit" className="add-form">Ajouter</button>
        </form>
    );
}

export default CountryForm;