// import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
// import Carousel from './components/Carousel';
import Catalog from './components/Catalog';
import Footer from './components/Footer';

// const images = [{
//   name: 'bulbasaur',
//   src: 'https://archives.bulbagarden.net/media/upload/thumb/f/fb/0001Bulbasaur.png/600px-0001Bulbasaur.png'
// },
// {
//   name: 'charmander',
//   src: 'https://archives.bulbagarden.net/media/upload/thumb/2/27/0004Charmander.png/600px-0004Charmander.png'
// },
// {
//   name: 'squirtle',
//   src: 'https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/600px-0007Squirtle.png'
// },
// {
//   name: 'pikachu',
//   src: 'https://archives.bulbagarden.net/media/upload/thumb/4/4a/0025Pikachu.png/600px-0025Pikachu.png'
// },
// {
//   name: 'Lamberto',
//   src: 'https://media.licdn.com/dms/image/D5603AQHskoJ15lo5Ww/profile-displayphoto-shrink_800_800/0/1678146443075?e=1686182400&v=beta&t=Vwk2ook4F8IUVX6ZoRMbMDNA8oE4gAwCAykoORur5Tk'
// },
// ]

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

  return (
    <div className="App">

        <NavBar />
        {/* <Carousel images={images}/> */}
        <Catalog />
        {/* <h1>{serverData}</h1> */}
        <Footer />
    </div>
  );
}

export default App;
