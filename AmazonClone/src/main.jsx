import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Home, SearchResult, Checkout, ProductPage} from './components/index.js'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"

import { store } from './redux/store.js'
import { Provider } from 'react-redux'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
     {
      path: "/search",
      element: <SearchResult />
     },
     {
      path: "/checkout",
      element: <Checkout />
     },
     {
      path: "/product/:id",
      element: <ProductPage />
     }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <RouterProvider router = {router}/>
    </Provider>
  </StrictMode>,
)
