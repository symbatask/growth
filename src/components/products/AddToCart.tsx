'use client'
import useCartService from '@/lib/models/hooks/useCartStore'
import React from 'react'
// import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { OrderItem } from '@/lib/models/OrderModel'

const AddToCart = ({ item }: { item: OrderItem }) => {
  // const router = useRouter()
  const { items, increase, decrease } = useCartService()
  const [existItem, setExistItem] = useState<OrderItem | undefined>()
  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug))
  }, [item, items])

  const addToCartHandler = () => {
    increase(item)
  }

  return existItem ? (
    <div>
      <button className="btn" type="button" onClick={() => decrease(existItem)}>
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button
      className="btn btn-primary w-full"
      type="button"
      onClick={addToCartHandler}
    >
      Add to Cart
    </button>
  )
}

export default AddToCart
