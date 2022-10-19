import { ProductStyles } from "../styles/ProductStyle"
import Link from "next/link"

function Product({ product }) {
  const { title, price, image, slug } = product.attributes
  return (
    <ProductStyles>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt="" />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyles>
  )
}

export default Product
