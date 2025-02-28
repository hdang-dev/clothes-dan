import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "../../../../mock";

export async function GET(request: NextRequest, { params }: { params: { productId: string; }; }) {
    const productId = params.productId;
    const product = PRODUCTS.find(item => item.sku.toLowerCase() === productId.toLowerCase());
    return NextResponse.json(product);
}