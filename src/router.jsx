import React, { Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom';
import Layout from './Layout.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import DiningTable from './components/dashboard/dinningTable/DinningTable.jsx';
import PageNotFound from './components/404Page/PageNotFound.jsx';
import BarCode from './components/dashboard/table/BarCode.jsx';
import AddItem from './components/addItem/addItem.jsx';
import FallbackPage from './pages/FallBack.jsx';
import DishList from './components/ManageFoodItem/DishList.jsx';
import OffersList from './pages/Promo/OffersList.jsx';
import AddOffer from './pages/Promo/AddOffer.jsx';
import PosContainer from './components/POS/PosContainer.jsx';
import SecondarySidebar from './pages/Setting/secondarySidebar.jsx';

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path='/' element={<Layout />} >
      <Route index element={
        <Suspense fallback={<FallbackPage />}>
          <Dashboard />
        </Suspense>
      } />
      <Route path='dinning' element={<DiningTable />} />
      <Route path='dinning/table' element={<DiningTable />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/manage-item" element={<DishList />} />
      <Route path="/offersList" element={<OffersList />} />
      <Route path="/add-offer" element={<AddOffer />} />
      <Route path="/pos" element={<PosContainer />} />
      <Route path="/settings" element={<SecondarySidebar />} />
      {/* <Route path="/offersList/AddOffer" element={<AddOffer />} /> */}
      <Route path='dinning/table/:id' element={<BarCode />} /> {/* <Route path='/settings' element={< SecondarySidebar />} /> */}
      <Route path='*' element={<PageNotFound />} />
    </Route>
  )
);

export default router;
