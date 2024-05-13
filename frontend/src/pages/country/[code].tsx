import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: String!) {
    country(code: $code) {
      name
      emoji
      code
    }
  }
`;

function CountryDetails() {
    const router = useRouter();
    const { code } = router.query;

    const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
        variables: { code },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { country } = data;

    return (
        <div className='details'>
            <p className='emoji-detail'>{country.emoji}</p>
            <p className='name-detail'>Nom : {country.name} ({country.code})</p>
            { }
        </div>
    );
}

export default CountryDetails;