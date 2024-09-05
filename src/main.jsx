import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Layout from './Layout.jsx';
const Dashboard = React.lazy(()=>import('./components/dashboard/Dashboard.jsx'))
// import Dashboard from './components/dashboard/Dashboard.jsx';
import DiningTable from './components/dashboard/dinningTable/DinningTable.jsx';
import PageNotFound from './components/404Page/PageNotFound.jsx';
import BarCode from './components/dashboard/table/BarCode.jsx';
import FallbackPage from './pages/FallBack.jsx';
import WindowContextProvider from './context/windowContext.jsx';
import PosContainer from './components/POS/PosContainer.jsx';
import { OffersProvider } from './context/OffersContext.jsx';
import router from './router.jsx';
// const router = createBrowserRouter(
//   createRoutesFromChildren(
//     <Route path='/' element={<Layout/>} >
//      <Route path='' element={<Suspense fallback={<FallbackPage/>}>
//       <Dashboard/>
//      </Suspense>} >
//         {/* <Route path='/dinning' element={<DiningTable/>} /> */}
//      </Route>
//      <Route path='dinning' element={<DiningTable/>} />
//      <Route path='dinning/table' element={<DiningTable/>} />
//      <Route path='dinning/table/:id' element={<BarCode/>} />
//      <Route path='pos' element={<PosContainer/>} />
//      <Route path='*' element={<PageNotFound/>} />
//     </Route>
//   )
// )
createRoot(document.getElementById('root')).render(
  
    <WindowContextProvider>
      <OffersProvider> {/* Wrap with OffersProvider */}
        <RouterProvider router={router} />
      </OffersProvider>
    </WindowContextProvider>
 
);
