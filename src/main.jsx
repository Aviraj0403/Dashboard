// src/main.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import WindowContextProvider from './context/windowContext';
import { OffersProvider } from './context/OffersContext'; // Import OffersProvider
import router from './router'; // Import the router configuration

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WindowContextProvider>
      <OffersProvider> {/* Wrap with OffersProvider */}
        <RouterProvider router={router} />
      </OffersProvider>
    </WindowContextProvider>
  </StrictMode>
);
