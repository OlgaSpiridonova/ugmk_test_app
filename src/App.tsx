import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './components/Chart/Chart';
import DetailPage from './components/DetailPage/DetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'

export const Context = createContext(null);
export const SetAppStateContext = createContext({});

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL).then((response) => {
      setData(response.data)
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chart />,
    },
    {
      path: "details/:factory_id/:mounth",
      element: <DetailPage />,
    },
  ]);
  return (
    <Context.Provider value={data}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App
