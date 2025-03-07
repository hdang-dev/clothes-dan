import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_GROUPS } from "../../../../mock";

export async function GET(request: NextRequest, { params }: { params: { productGroupName: string; }; }) {
    const productGroupName = params.productGroupName;
    const productGroup = PRODUCT_GROUPS.filter(productGroup => productGroup.key.toLowerCase() === productGroupName.toLowerCase())[0];
    return NextResponse.json(productGroup);
}