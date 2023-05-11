import { useEffect, useState } from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Chart } from './components/Chart';
import { DetailPage } from './components/DetailPage';
import { RowDataContext } from './store/context';

import './App.css'

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
    <RowDataContext.Provider value={data}>
      <RouterProvider router={router} />
    </RowDataContext.Provider>
  );
}

export default App
