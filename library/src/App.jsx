import React from 'react'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import StudentLogin from './Layout/StudentLogin';
import DashboardHome from './Layout/DashboardHome';
import Dashboard from './Layout/Dashboard';
import AllBooks from './Layout/AllBooks';
import IssuedBooks from './Layout/IssuedBooks';
import History from './Layout/History';
import ForgotPassword from './Layout/ForgotPassword';



function App() {

  let router= createBrowserRouter([
    {
      path:"/",
      element:<StudentLogin/>
    },
    {
      path:"/forgotpassword",
      element:<ForgotPassword/>

    },
    {
      path:"/dashboardhome",
      element:<DashboardHome/>,
      children:[
        {
          path:"",
          element:<Dashboard/>
        },
        {
          path:"allbooks",
          element:<AllBooks/>
        },
        {
          path:"issuebooks",
          element:<IssuedBooks/>
        },
   
        {
          path:"history",
          element:<History/>
        }
      ]
    }
  ])


  return (
    <RouterProvider  router={router}/>
  )
}

export default App