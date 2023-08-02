import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
// import AuthRequire from './router/AuthRequire';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/account',
        element: <AccountPage />,
      },
    ],
  },
]);
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
