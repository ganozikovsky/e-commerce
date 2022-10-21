import { useQuery } from "urql"
import { GET_PRODUCT_QUERY } from "../../lib/query"
import { useRouter } from "next/router"
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetail"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { useStateContext } from "../../lib/context"
import toast from "react-hot-toast"

function ProductDetails() {
  const {
    qty,
    increaseQty,
    decreaseQty,
    showCart,
    setShowCart,
    cartItems,
    onAdd,
  } = useStateContext()

  // fetch slug
  const {
    query: { slug },
  } = useRouter()

  // fetch graphql data
  const [{ data, fetching, error }] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh... {error.message}</p>

  const { title, description, image } = data.products.data[0].attributes

  // create a toast
  const notify = () => {
    toast.success(`${title} added to cart!"`)
  }
  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty)
            notify()
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  )
}

export default ProductDetails
