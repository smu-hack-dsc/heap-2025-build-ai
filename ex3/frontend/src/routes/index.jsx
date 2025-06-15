// YOU DO NOT NEED TO TOUCH THIS FILE

import { lazy, Suspense } from 'react'
import Loader from '../components/Loader'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

const Home = lazy(() => import('../pages/Chat'));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: (
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
        )
      },      
    ],
  },
]);