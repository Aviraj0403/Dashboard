import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import WindowContextProvider from './context/windowContext.jsx';
import router from './router.jsx';  // Import the router configuration

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WindowContextProvider>
      <RouterProvider router={router} />
    </WindowContextProvider>
  </StrictMode>
);
