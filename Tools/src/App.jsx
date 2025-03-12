import { useState } from "react";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import ML from './pages/ML/MachineLearning.jsx';
import NLP from './pages/NLP/Nlp.jsx'
import Login from './pages/Auth/Auth.jsx';
import AppLayout from "./AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "ml", element: <ML /> },
      { path: "nlp", element: <NLP /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;