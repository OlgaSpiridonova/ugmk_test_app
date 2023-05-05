import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './components/Chart/Chart';
import DetailPage from './components/DetailPage/DetailPage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './App.css'
const Context = React.createContext(null);
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL).then((response) => {
      setData(response);
      console.log(data);
    });
  }, []) 

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Chart />} />
        <Route path="details/:factory_id/:mounth" element={<DetailPage />} />
      </>
    ),
  );
  return (
    <Context.Provider value={data}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App
