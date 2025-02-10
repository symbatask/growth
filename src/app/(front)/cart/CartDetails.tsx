'use client'
import useCartService from '@/lib/models/hooks/useCartStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import React from 'react'

const CartDetails = () => {
  const router = useRouter()
  const { items, itemsPrice, increase, decrease } = useCartService()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return <></>
  return (
    <>
      <h1 className="py-4 text-2xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          Cart is empty <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quality</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      ></Link>
                      <Image
                        alt={item.slug}
                        src={item.image}
                        width={50}
                        height={50}
                      />
                      <span className="px-2">{item.name} </span>
                    </td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => decrease(item)}
                      >
                        -
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => increase(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <p>${item.price}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card bg-base-300">
              <div className="card-body">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal {items.reduce((a, c) => a + c.qty, 0)} : $
                      {itemsPrice}
                    </div>
                  </li>
                  <li>
                    <button
                      className="btn btn-primary w-full"
                      type="button"
                      onClick={() => router.push('/shipping')}
                    >
                      Proceed to checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartDetails
