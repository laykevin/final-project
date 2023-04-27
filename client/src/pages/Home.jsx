import Carousel from '../components/Carousel'
import CatalogList from '../components/CatalogList';
const newItems = [{
  name: 'Feather',
  id: 12,
  src: 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail22.png',
  description: 'Gives karts a tail that allows the user to block items, flip over nearby players, and collect nearby Coins(Mario Kart 7, Mario Kart Tour).A Super Leaf is one of the many power- up items in the Mario franchise.Super Leaves originated in the game Super Mario Bros.'
},
{
  name: 'Boo',
  id: 4,
  src: 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail23.png',
  description: 'Turn your cart invisible and pass through enemy items like bananas and shells! In addition, you will steal items from other players!'
}];

const hotItems = [{
  productName: 'Golden Mushroom',
  productId: 16,
  image: 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail11.png',
  price: 4999
},
{
  productName: 'Spiny Shell',
  productId: 27,
  image: 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail07.png',
  price: 4999
},
{
  productName: 'Starman',
  productId: 30,
  image: 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail15.png',
  price: 4999
}
];

export default function Home() {
  return (
    <div className="container black-bg-img">
      <h1 className="text-white text-center">Welcome to Mario Mart!</h1>
      <Carousel images={newItems}/>
      <h1 className="text-white text-center">🔥Hot Items🔥</h1>
      <div className="row">
        <CatalogList catalog={hotItems} userInput={''} />
      </div>
    </div>

  )
}
