import { createContext, useReducer } from 'react'
import { DUMMY_PRODUCTS } from '../dummy-products'

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  onUpdateCartItemQuantity: () => {}
})

const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

function shoppingCartReducer (state, action) {
  console.log(state)
  switch (action.type) {
    case ADD_ITEM: {
      const updatedItems = [...state.items]

      const existingCartItemIndex = updatedItems.findIndex(
        cartItem => cartItem.id === action.payload
      )
      const existingCartItem = updatedItems[existingCartItemIndex]

      if (existingCartItem) {
        console.log('here')
        console.log(existingCartItem.quantity)
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1
        }
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
        const product = DUMMY_PRODUCTS.find(product => product.id === action.payload)
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1
        })
      }

      return {
        ...state,
        items: updatedItems
      }
    }
    case UPDATE_ITEM_QUANTITY: {
      const { productId, amount } = action.payload
      const updatedItems = [...state.items]
      const updatedItemIndex = updatedItems.findIndex(
        item => item.id === productId
      )

      const updatedItem = {
        ...updatedItems[updatedItemIndex]
      }

      updatedItem.quantity += amount

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1)
      } else {
        updatedItems[updatedItemIndex] = updatedItem
      }

      return {
        ...state,
        items: updatedItems
      }
    }
  }
}

export default function CartContextProvider ({ children }) {
  const [shoppingCart, shoppingDispatch] = useReducer(shoppingCartReducer, {
    items: []
  })

  function handleAddItemToCart (id) {
    shoppingDispatch({
      type: ADD_ITEM,
      payload: id
    })
  }

  function handleUpdateCartItemQuantity (productId, amount) {
    shoppingDispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: {
        productId,
        amount
      }
    })
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    onUpdateCartItemQuantity: handleUpdateCartItemQuantity
  }

  return (
    <CartContext.Provider value={ctxValue}>
        {children}
    </CartContext.Provider>)
}
