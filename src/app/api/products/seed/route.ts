import data from "@/lib/models/data";
import dbConnect from "@/lib/models/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import UserModel from "@/lib/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const {users,products} = data
    await dbConnect()
    await UserModel.deleteMany()
    await UserModel.insertMany(users)
 
    await ProductModel.deleteMany()
    await ProductModel.insertMany(products)

    return NextResponse.json({
        message: "seeded successfully",
        users,
        products,
    })
}