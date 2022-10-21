import Link from "next/link"
import { FiShoppingBag } from "react-icons/fi"
import { NavStyles, NavItems } from "../styles/NavStyles"
import Cart from "./Cart"
import User from "./User"
import { useStateContext } from "../lib/context"
const { AnimatePresence, motion } = require("framer-motion")
import { useUser } from "@auth0/nextjs-auth0"

function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext()
  const { user, error, isLoading } = useUser()
  return (
    <NavStyles>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart </h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  )
}

export default Nav
