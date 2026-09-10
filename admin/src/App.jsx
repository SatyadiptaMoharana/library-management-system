//app.jsx

import React from 'react'
import AdminLogin from './pages/AdminLogin'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './layouts/Dashboard';
import AllBooks from './layouts/AllBooks';
import AddStudent from './layouts/AddStudent';
import RemoveStudent from './layouts/RemoveStudent';
import AddBook from './layouts/AddBook';
import RemoveBook from './layouts/RemoveBook';
import IssueBook from './layouts/IssueBook';
import SubmitBook from './layouts/SubmitBook';
import AllStudents from './layouts/AllStudents';

function App() {

  let router= createBrowserRouter([
    {
      path:"/",
      element:<AdminLogin/>
    },
    {
      path:"/admindashboard",
      element:<AdminDashboard/>,
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
          path:"allstudents",
          element:<AllStudents/>
        },
        {
          path:"addstudent",
          element:<AddStudent/>
        },
        {
          path:"removestudent",
          element:<RemoveStudent/>
        },
        {
          path:"addbook",
          element:<AddBook/>
        },
        {
          path:"removebook",
          element:<RemoveBook/>
        },
        {
          path:"issuebook",
          element:<IssueBook/>
        },
        {
          path:"submitbook",
          element:<SubmitBook/>
        },
      ]
    }
  ])


  return (
    <RouterProvider  router={router}/>
  )
}

export default App