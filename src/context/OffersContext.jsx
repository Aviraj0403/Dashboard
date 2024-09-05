// src/contexts/OffersContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// const URL = "http://localhost:4000";

const OffersContext = createContext();

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${URL}/api/offers`);
        setOffers(response.data.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const addOffer = async (newOffer) => {
    try {
      const response = await axios.post(`${URL}/api/offers`, newOffer, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setOffers(prevOffers => [...prevOffers, response.data.data]);
        return response.data.message;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding offer:', error);
      return 'Error adding offer';
    }
  };

  return (
    <OffersContext.Provider value={{ offers, isLoading, addOffer }}>
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => useContext(OffersContext);
