import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { NavBar, Footer } from './components';
import { Catalog, Home, MyCart, ProductDetails, SignIn, SignUp, Checkout, OrderHistory, NotFound } from './pages'
import { AppContext } from './lib';

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
