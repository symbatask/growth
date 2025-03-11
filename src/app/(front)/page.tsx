import ProductItem from '@/components/products/ProductItem'
import productService from '@/lib/models/services/ProductService'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Next Amazona V2',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server comonents, Zustand, Next auth, daisyui',
}



export default async function Home() {
  // const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  return (
    <>
      <h2 className="text-2xl py-2">latest products</h2>
      {/* <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative full"
          >
            <Link href={`/product/${product.slug}`}>
              <img src={product.banner} className="w-full" alt={product.name} />
            </Link>
            <div className="absolute flex justify-between transform-translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                -
              </a>
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index + 1
                }`}
                className="btn btn-circle"
              >
                +
              </a>
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </>
  )
}
