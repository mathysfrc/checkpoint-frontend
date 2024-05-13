import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_ALL_CONTINENTS = gql`
  query GetAllContinents {
    continents {
      id
      name
    }
  }
`;

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
        continentId: '', // Nouveau champ pour stocker l'ID du continent sélectionné
    });

    const { loading, error, data } = useQuery(GET_ALL_CONTINENTS);

    const [addCountry] = useMutation(ADD_COUNTRY, {
        update(cache, { data: { addCountry } }) {
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
        onError(error) {
            console.error("Mutation error:", error);
            alert("Une erreur s'est produite lors de l'ajout du pays. Veuillez réessayer.");
        }
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.code || !formData.emoji || !formData.continentId) {
            alert("Veuillez remplir tous les champs du formulaire.");
            return;
        }
        try {
            await addCountry({
                variables: { data: formData },
            });
            setFormData({
                name: '',
                code: '',
                emoji: '',
                continentId: '',
            });
            alert("Le pays vient d'être ajouté à la liste !");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} />
            <input type="text" name="code" placeholder="Code" value={formData.code} onChange={handleChange} />
            <input type="text" name="emoji" placeholder="Emoji" value={formData.emoji} onChange={handleChange} />
            <select name="continentId" value={formData.continentId} onChange={handleChange}>
                <option value="">Sélectionnez un continent</option>
                {data.continents.map(continent => (
                    <option key={continent.id} value={continent.id}>{continent.name}</option>
                ))}
            </select>
            <button type="submit" className="add-form">Ajouter</button>
        </form>
    );
}

export default CountryForm;