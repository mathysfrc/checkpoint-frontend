import Link from "next/link";
import Header from "../components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import CountryForm from "../components/CountryForm";
import CountryList from '../components/CountryList';

export default function Home() {
  return (
    <div>
      <Header />
      <CountryForm />
      <CountryList />
    </div>
  );
}