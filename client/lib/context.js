import React, { createContext, useContext, useState } from "react"

const ShopContext = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [qty, setQty] = useState(1)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
    })
  }

  const onAdd = (product, quantity) => {
    // total price
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity)

    // increase total qty
    setTotalQuantities((prevTotal) => prevTotal + quantity)

    // check if the product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug)
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity }])
    }
  }

  const onRemove = (product) => {
    // total price
    setTotalPrice((prevTotal) => prevTotal - product.price)

    // decrease total qty
    setTotalQuantities((prevTotal) => prevTotal - 1)

    const exist = cartItems.find((item) => item.slug === product.slug)
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      )
    }
  }

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
        setTotalPrice
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export const useStateContext = () => useContext(ShopContext)
