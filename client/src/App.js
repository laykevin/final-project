// import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from "react-router-dom";
// import Carousel from './components/Carousel';
import Catalog from './pages/Catalog';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import ProductDetails from './pages/ProductDetails';

function App() {
  // const [serverData, setServerData] = useState("");

  // useEffect(() => {
  //   async function getServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     setServerData(data.message);
  //   }

  //   getServerData();
  // }, []);

  // return (
  //   <div className="App">

  //       <NavBar />
  //       {/* <Carousel images={images}/> */}
  //       <Catalog />
  //       {/* <h1>{serverData}</h1> */}
  //       <Footer />
  //   </div>
  // );
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="details/:productId" element={<ProductDetails />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="mycart" element={<MyCart />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
