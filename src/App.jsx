import React, { useCallback, useEffect } from 'react';
import { ProtectedRouter, UnProtectedRouter, NormalRouter } from './components/ManageRoutes';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setMain, selectorLoading, dispatch } from './redux/main';
import ErrorPage from "./components/ErrorPage";
import Loader from './components/Loader';
import Index from './screens/index/Index';
import Product from './screens/product/Product';
import Register from './screens/register/Register';
import Login from './screens/login/Login';
import FaqList from './screens/faq/FaqList';
import FaqDetail from './screens/faq/FaqDetail'
import Contact from './screens/contact/Contact';
import PasswordReset from './screens/resetPassword/PasswordReset';
import SendResetPasswordEmail from './screens/resetPassword/SendResetPassword';
import VerifyAccount from './screens/verifyAccount/VerifyAccount';
import PurchaseList from './screens/purchaseList/PurchaseList';
import PurchaseDetail from './screens/purchaseDetail/PurchaseDetail';
import AddressForm from './screens/addressForm/AddressForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NormalRouter children={<Index />} />,
    errorElement: <ErrorPage />
  },
  {
    path: 'product/:id',
    element: <NormalRouter children={<Product />} />,
    errorElement: <ErrorPage />
  },
  {
    path: 'signup',
    element: <UnProtectedRouter children={<Register />} redirectPath='/' />,
    errorElement: <ErrorPage />
  },
  {
    path: 'signin',
    element: <UnProtectedRouter children={<Login />} redirectPath='/' />,
    errorElement: <ErrorPage />
  },
  {
    path: 'faq',
    element: <NormalRouter children={<FaqList />} />,
    errorElement: <ErrorPage />
  },
  {
    path: 'faq/:id',
    element: <NormalRouter children={<FaqDetail />} />,
    errorElement: <ErrorPage />
  },
  {
    path: 'contact',
    element: <ProtectedRouter children={<Contact />} redirectPath='/signin' />,
    errorElement: <ErrorPage />
  },

  {
    path: 'verify-account/:uidb/:token',
    element: <VerifyAccount />,
    errorElement: <ErrorPage />
  },

  {
    path: 'send-reset-password',
    element: <NormalRouter children={<SendResetPasswordEmail />} />,
    errorElement: <ErrorPage />
  },

  {
    path: 'password-reset',
    element: <NormalRouter children={<PasswordReset />} />,
    errorElement: <ErrorPage />
  },

  {
    path: 'purchases',
    element: <ProtectedRouter children={<PurchaseList />} redirectPath='/signin' />,
    errorElement: <ErrorPage />
  },
  {
    path: 'purchase/:id',
    element: <ProtectedRouter children={<PurchaseDetail />} redirectPath='/signin' />,
    errorElement: <ErrorPage />
  },

  {
    path: 'add-address',
    element: <ProtectedRouter children={<AddressForm />} redirectPath='/signin' />,
    errorElement: <ErrorPage />,
  }
  
]);

const App = () => {
  const loading  = useSelector(selectorLoading);

  const get_user = useCallback(async () => {
    try {
      const token = localStorage.getItem('@token');
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/`,
        { headers: { 'Authorization': `Token ${token}` } }
      )
      dispatch(setMain({ loading: false, ...res.data }));
    } catch {
      dispatch(setMain({ loading: false }));
    }
  }, []);

  useEffect(() => {
    get_user();
  }, [get_user]);

  if (loading) return <Loader />;
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}
export default App;
