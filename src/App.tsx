import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ContactUs from './components/ContactUs';
import Payment from './features/payments/PaymentSuccess';
import About from './components/About';
import HouseList from './components/HouseList';
import Error from './pages/Error';
import MoreServices from './components/MoreServices';
import Register from './features/register/Register';
import AdminDashboard from './dashboard/AdminDashboard';
import Login from './features/login/Login';
import UserDashboard from './dashboard/UserDashboard';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import BookHouse from './features/houses/BookHouse';
import Bookings from './features/houses/Bookings';
import MyTickets from './features/customer_suppport-tickets/MyTickets';
import NewTicket from './features/customer_suppport-tickets/NewTicket';
import CustomerSupport from './features/customer_suppport-tickets/CustomerSupport';
import UsersTable from './features/users_management/UsersTable'
import Houses from './features/houses/Houses';
import Location from './features/location/Location';
import Profile from './pages/Profile';
import PaymentsInfo from './components/PaymentsInfo';
import RouteProtection from './components/RouteProtection';
import ContactSuccess from './components/ContactSuccess';
const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: 'about',
      element: <About />,
      errorElement: <Error />,
    }, 
    {
      path: 'houseList',
      element: <HouseList />,
      errorElement: <Error />,
    },
    {
      path: 'more-services',
      element: <MoreServices />,
      errorElement: <Error />,
    } ,
    {
      path: 'admin-dashboard/*',
      element: (<RouteProtection element={AdminDashboard} role="admin"/>),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Admin />,
        },
        {
          path: 'houses',
          element: <Houses/>,
        },
        {
          path: 'book-house',
          element: <BookHouse/>,
        },
        {
          path: 'users',
          element: <UsersTable/>,
        },
        {
          path: 'location',
          element: <Location/>,
        },
        {
          path: 'customer-support',
          element: <CustomerSupport />,
        },
        {
          path: 'paymentsInfo',
          element: <PaymentsInfo/>,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: 'user-dashboard/*',
      element: (<RouteProtection element={UserDashboard} role="user"/>),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Dashboard />,
        },
        {
          path: 'book-house',
          element: <BookHouse />,
        },
        {
          path: 'bookings',
          element: <Bookings />,
        },
        {
          path: 'my-tickets',
          element: <MyTickets />,
        },
        {
          path: 'new-ticket',
          element: <NewTicket />,
        },
        {
          path: 'profile',
          element: <Profile />,
          errorElement: <Error />,
        },
   
       
      ],
    },
    {
      path: 'payment-success',
      element: <Payment />,
      errorElement: <Error />,
    },
    {
      path: 'contact-us',
      element: <ContactUs />,
      errorElement: <Error />,
    },
    {
      path: 'contact-success',
      element: <ContactSuccess />,
      errorElement: <Error />,
    },
  ]);

  return(
    <div>
    <RouterProvider router={router} />
    </div>
    ) 
}

export default App
