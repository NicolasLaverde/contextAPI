import Header from './components/Header.jsx'
import Shop from './components/Shop.jsx'
import { DUMMY_PRODUCTS } from './dummy-products.js'
import Product from './components/Product.jsx'
import CartContextProvider from './store/CartContext.jsx'

function App () {
  return (
    <CartContextProvider >
      <Header />
      <Shop>
        <ul id='products'>
          {DUMMY_PRODUCTS.map(product => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </ul>
      </Shop>
    </CartContextProvider>
  )
}

export default App
