import React, { Suspense } from "react";
import {
  Link,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import DiningTable from "./components/dashboard/dinningTable/DinningTable.jsx";
import PageNotFound from "./components/404Page/PageNotFound.jsx";
import BarCode from "./components/dashboard/table/BarCode.jsx";
import AddItem from "./components/addItem/addItem.jsx";
import FallbackPage from "./pages/FallBack.jsx";
import DishList from "./components/ManageFoodItem/DishList.jsx";
import OffersList from "./pages/Promo/OffersList.jsx";
import AddOffer from "./pages/Promo/AddOffer.jsx";
import PosContainer from "./components/POS/PosContainer.jsx";
import SecondarySidebar from "./pages/Setting/secondarySidebar.jsx";
import TransactionDashboard from "./pages/Accounts/TransactionDashBoard.jsx";
import TableOrders from "./pages/TableOrders/TableOrders.jsx";
import OrderDetails from "./pages/TableOrders/OrderDetails.jsx";
import Navbar from "./components/footer/Dummy.jsx";
import LoginPage from "./pages/Login/Login.jsx";
import ProtectedRoute from "./components/secureRoute/ProtectedRoute.jsx";
import CompanyForm from "./pages/Setting/Company/Company.jsx";
import Branch from "./pages/Setting/Branch/Branch.jsx";
import Landing from "./pages/Landin/LandingPage.jsx";
import SalesReport from "./pages/Reports/SaleReport.jsx"
import ItemsReport from "./pages/Reports/ItemsReport.jsx"
import GstReport from "./pages//Reports/GSTReport.jsx"
// Corrected router setup
const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      {/* Public Route (Login Page) */}
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<LoginPage />} />

      {/* Protected Routes (Admin) */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="" element={<Layout />}>
          {" "}
          {/* Layout wraps nested routes */}
          <Route
            path=""
            element={
              <Suspense fallback={<FallbackPage />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<FallbackPage />}>
                <Dashboard />
              </Suspense>
            }
          />
          {/* Admin nested routes */}
          <Route path="dining" element={<DiningTable />} />
          <Route path="dining/table" element={<DiningTable />} />
          <Route path="dining/table/:id" element={<BarCode />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="manage-item" element={<DishList />} />
          <Route path="offersList" element={<OffersList />} />
          <Route path="add-offer" element={<AddOffer />} />
          <Route path="pos" element={<PosContainer />} />
          <Route path="transactions" element={<TransactionDashboard />} />
          <Route path="table-orders" element={<TableOrders />} />
          <Route path="table-orders/:id" element={<OrderDetails />} />
          <Route path="items" element={<Navbar />} />
          {/* REPORT */}
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="items-report" element={<ItemsReport />} />
          <Route path="gst-report" element={<GstReport />} />
          <Route path="settings" element={<SecondarySidebar />}>
            <Route path="" element={<CompanyForm />} />
            <Route path="company" element={<CompanyForm />} />
            <Route path="branches" element={<Branch />} />
            <Route path="*" element={<PageNotFound />} />
            <Route />
          </Route>
          {/* 404 Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
