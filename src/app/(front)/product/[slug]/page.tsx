import data from '@/lib/models/data'
import Link from 'next/link'
import Image from 'next/image'
import AddToCart from '@/components/products/AddToCart'
import productService from '@/lib/models/services/ProductService'
import { convertDocToObj } from '@/lib/models/utils'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return { title: 'product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

const ProductDetails = async({ params }: { params: { slug: string } }) => {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return <div>product not found</div>
  }
  return (
    <>
      <div className="my-2">
        <Link href="/ ">back to product</Link>
      </div>
      <div className="grid md:grid-cols-3 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.brand}</li>
            <li className="divider"></li>
            <li>
              Description: <p>{product.description}</p>
            </li>
          </ul>

          <div className="card bg-base-300 shadow-xl mt-3 md:mat-0">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In stock' : 'unvailable'}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className="card-actions justify-center">
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      ...product,
                      qty: 0,
                      color: '',
                      size: '',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
