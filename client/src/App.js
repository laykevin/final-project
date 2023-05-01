import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import AppContext from './components/AppContext';
import Catalog from './pages/Catalog';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import ProductDetails from './pages/ProductDetails';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import NotFound from './pages/NotFound';

const tokenKey = 'react-context-jwt'

function App() {
  const [user, setUser] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(result) {
    const { user, token } = result;
    localStorage.setItem(tokenKey, token);
    setUser(user);
    navigate(-2);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    navigate('/');
  }

  const contextValue = { user, handleSignIn, handleSignOut };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <AppContext.Provider value={contextValue}>
        <div className="flex-grow-1 d-flex flex-column">
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="details/:productId" element={<ProductDetails />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="mycart" element={<MyCart />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn onSignIn={handleSignIn}/>} />
              <Route path="checkout" element={<Checkout />} />
              <Route path ="orderhistory" element={<OrderHistory />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
