import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "../../../../mock";

export async function GET(request: NextRequest, { params }: { params: { productId: string; }; }) {
    const productId = params.productId;
    const productCategory = PRODUCTS.find(item => item.sku.toLowerCase() === productId.toLowerCase())!.category;
    const similarProducts = PRODUCTS.filter(item => item.category === productCategory && item.sku !== productId).slice(0, 5);
    return NextResponse.json(similarProducts);
}