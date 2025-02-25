import { cache } from 'react'
import dbConnect from '../dbConnect'
import { Product } from '../ProductModel'
import ProductModel from '../ProductModel'
export const revalidate = 3600

const getLatest = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(4).lean()
  return products as Product[]
})

const getFeatured = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  console.log(products)
  return products as Product[]
})

const getBySlug = cache(async (slug: string) => {
  await dbConnect()
  const products = await ProductModel.findOne({ slug }).lean()
  return products as Product
})

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
}

export default productService
