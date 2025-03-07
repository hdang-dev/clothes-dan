import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_GROUPS } from "../../../../mock";

export async function GET(request: NextRequest, { params }: { params: { productGroupName: string; }; }) {
    const { productGroupName } = params;
    const productGroup = PRODUCT_GROUPS.filter(item => item.key.toLowerCase() === productGroupName.toLowerCase())[0];
    const productGroups = PRODUCT_GROUPS.filter(item => item.items[0].category === productGroup.items[0].category && item.key.toLowerCase() !== productGroupName.toLowerCase());
    return NextResponse.json(productGroups);
}