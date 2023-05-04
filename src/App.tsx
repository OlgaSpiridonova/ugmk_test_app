import Chart from './components/Chart/Chart';
import DetailPage from './components/DetailPage/DetailPage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './App.css'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Chart />} />
        <Route path="details/:factory_id/:mounth" element={<DetailPage />} />
      </>
    ),
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App
