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
import SalesReport from "./pages/Reports/SaleReport.jsx";
import ItemsReport from "./pages/Reports/ItemsReport.jsx";
import GstReport from "./pages/Reports/GSTReport.jsx";
import EmployeeTable from "./pages/Employee/EmployeeTable.jsx";
import Site from "./pages/Setting/Site/Site.jsx";
import MailSettings from "./pages/Setting/Mail/MailSetting.jsx";
import FirebaseNotification from "./pages/Setting/Notification/Notification.jsx";
import NotificationAlert from "./pages/Setting/Notification/NotificationAlert.jsx";
import Theme from "./pages/Setting/Theme/Theme.jsx";
import Otp from "./pages/Setting/OTP/OTP.jsx";
import Currencies from "./pages/Setting/Currency/Currency.jsx";
import ItemCategory from "./pages/Setting/ItemCategory/ItemCategory.jsx";
import RolePermissions from "./pages/Setting/RolePermission/RolePermissions.jsx";
import TaxManagement from "./pages/Setting/Taxes/TaxManagement.jsx";
import PaymentGateway from "./pages/Setting/PaymentGateway/PaymentGateway.jsx";
import Administrators from "./pages/Adminstrators/Adminstrators.jsx";
import EmployeeAttendance from "./pages/Employee/EmployeeAttendance.jsx";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard.jsx";
import EditDish from "./components/ManageFoodItem/EditDish.jsx";
import DishDetails from "./components/ManageFoodItem/DishDetails.jsx";
import SuperAdminDashboard from "./components/superAdminDashboard/SuperAdminDashboard.jsx"; // Import SuperAdminDashboard

// Corrected router setup
const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      {/* Public Route (Login Page) */}
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<LoginPage />} />


      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'superAdmin']} />}>
        <Route path="" element={<Layout />}>
          <Route path="dashboard" element={
            <Suspense fallback={<FallbackPage />}>
              <Dashboard />
            </Suspense>
          } />

      {/* Protected Routes (Admin) */}
      {/* <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="" element={<Layout />}>

          <Route
            path=""
            element={
              <Suspense fallback={<FallbackPage />}>
                <Dashboard />
              </Suspense>
            }
          /> */}
          {/* <Route
            path="dashboard"
            element={
              <Suspense fallback={<FallbackPage />}>
                <Dashboard />
              </Suspense>
            }
          /> */}

{/* <Route path="superAdminDashboard" element={
  <ProtectedRoute allowedRoles={['superAdmin']}>
    <SuperAdminDashboard />
  </ProtectedRoute>
} /> */}
          {/* Super Admin Dashboard */}
          <Route
            path="super-admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['superAdmin']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* Admin nested routes */}
          <Route path="dining" element={<DiningTable />} />
          <Route path="dining/table" element={<DiningTable />} />
          <Route path="dining/table/:id" element={<BarCode />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="manage-item" element={<DishList />} />
          <Route path="manage-item/edit-dish/:id" element={<EditDish />} />
          <Route path="manage-item/dish-details/:id" element={<DishDetails />} />
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
          {/* USER */}
          <Route path="employee" element={<EmployeeTable />} />
          <Route path="administrator" element={<Administrators />} />
          <Route path="emp-Att" element={<EmployeeAttendance />} />
          <Route path="emp-dash" element={<EmployeeDashboard />} />

          {/* Setting */}
          <Route path="settings" element={<SecondarySidebar />}>
            <Route path="" element={<CompanyForm />} />
            <Route path="company" element={<CompanyForm />} />
            <Route path="branches" element={<Branch />} />
            <Route path="site" element={<Site />} />
            <Route path="mail" element={<MailSettings />} />
            <Route path="otp" element={<Otp />} />
            <Route path="notification" element={<FirebaseNotification />} />
            <Route path="notification-alert" element={<NotificationAlert />} />
            <Route path="theme" element={<Theme />} />
            <Route path="currency" element={<Currencies />} />
            <Route path="item-categories" element={<ItemCategory />} />
            <Route path="role-permissions" element={<RolePermissions />} />
            <Route path="taxes" element={<TaxManagement />} />
            <Route path="payment-gateway" element={<PaymentGateway />} />
            {/* <Route path="sad" element={< SuperAdminDashboard />}/> */}
            <Route path="*" element={<PageNotFound />} />
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
