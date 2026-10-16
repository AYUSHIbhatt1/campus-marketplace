import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Register from "./pages/Register";
import Home from './pages/Home';
import EditListing from '../src/pages/EditListing';
import ListingDetails from '../src/pages/ListingDetail'
import ProtectedRoute from './components/ProtectedRoutes'
import { useState ,useEffect} from 'react';
import Login from './pages/Login';
import axios from 'axios';
import AddListing from './pages/AddListing';
function App() {
   
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isCheckingAuth, setIsCheckingAuth] = useState(true);

useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me `, {
        withCredentials: true
    })
    .then(() => setIsLoggedIn(true))
    .catch(() => setIsLoggedIn(false))
    .finally(() => {
  setIsCheckingAuth(false);
});
}, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
    <Navbar search={search} setSearch={setSearch} category={category}
  setCategory={setCategory} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home search={search} category={category} />}/>
         <Route path="/register" element={<Register />} />
         <Route
  path="/login"
  element={<Login setIsLoggedIn={setIsLoggedIn} />}
/>
          <Route
  path="/add-listing"
  element={
    <ProtectedRoute
      isLoggedIn={isLoggedIn}
      isCheckingAuth={isCheckingAuth}
    >
      <AddListing/>
    </ProtectedRoute>
  }
/>
        <Route
  path="/edit-listing/:id"
  element={
    <ProtectedRoute
      isLoggedIn={isLoggedIn}
      isCheckingAuth={isCheckingAuth}
    >
      <EditListing />
    </ProtectedRoute>
  }
/>
          <Route path="/listing/:id" element={<ListingDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
