import { useRef } from 'react'

import CartModal from './CartModal.jsx'
import { CartContext } from '../store/CartContext.jsx'

/* CartContext.Consumer es otra manera de poder usar el contexto dentro de un componente.
No es la manera recomendable pero se debe saber ya que uno se puede encontrar con bastante codigo
algo viejo ( 2019, 2020 ) que use esta manera de consumir contextos
*/
export default function Header () {
  const modal = useRef()
  return (
    <CartContext.Consumer>
      {({ items }) => {
        const cartQuantity = items.length

        function handleOpenCartClick () {
          modal.current.open()
        }

        let modalActions = <button>Close</button>

        if (cartQuantity > 0) {
          modalActions = (
            <>
              <button>Close</button>
              <button>Checkout</button>
            </>
          )
        }
        return (
          <>
            <CartModal
              ref={modal}
              title='Your Cart'
              actions={modalActions}
            />
            <header id='main-header'>
              <div id='main-title'>
                <img src='logo.png' alt='Elegant model' />
                <h1>Elegant Context</h1>
              </div>
              <p>
                <button onClick={handleOpenCartClick}>
                  Cart ({cartQuantity})
                </button>
              </p>
            </header>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
