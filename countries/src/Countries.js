import React, { useState, useEffect } from 'react';
import "./Countries.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="countries-container">
      {error && <p>Error: {error}</p>}
      {countries.map(country => (
        <div key={country.cca2} className="country-card">
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <p>{country.name.common}</p>
        </div>
      ))}
    </div>
  );
};

export default Countries;
