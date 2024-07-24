import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Hero from './components/Hero'
import ProductPage from './components/Product';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Display from './components/Display';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
