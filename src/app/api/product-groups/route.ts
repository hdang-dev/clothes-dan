import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_GROUPS } from "../../../mock";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    let productGroups = PRODUCT_GROUPS;

    for (const entry of searchParams.entries()) {
        const [key, value] = [entry[0], entry[1].toLowerCase()];
        if (value !== '') {
            switch (key) {
                case 'search': {
                    productGroups = productGroups.filter(productGroup => productGroup.items[0].name.toLowerCase().includes(value));
                    break;
                }
                case 'categories': {
                    const categories = value.split(',').filter(item => item !== '');
                    productGroups = productGroups.filter(productGroup => categories.includes(productGroup.items[0].category.toLowerCase()));
                    break;
                }
                case 'minPrice': {
                    const minPrice = Number(value);
                    productGroups = productGroups.filter(productGroup => productGroup.lowestPrice >= minPrice);
                    break;
                }
                case 'maxPrice': {
                    const maxPrice = Number(value);
                    productGroups = productGroups.filter(productGroup => productGroup.lowestPrice <= maxPrice);
                    break;
                }
                case 'sizes': {
                    // const sizes = value.split(',').filter(item => item !== '');
                    // productGroups = productGroups.filter(productG => sizes.includes(productGroups..size.toLowerCase()));
                    // break;

                    const sizes = value.split(',').filter(item => item !== '');
                    const productGroupsBySizes = sizes.map(size => {
                        return productGroups.filter(productGroup => {
                            for (const product of productGroup.items) {
                                if (product.size.toLowerCase() === size) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    });
                    productGroups = [...new Set(productGroupsBySizes.reduce((totalProductGroups, productGroupsBySize) => ([...totalProductGroups, ...productGroupsBySize]), []))];
                    break;
                }
                case 'tones': {
                    const tones = value.split(',').filter(item => item !== '');
                    productGroups = productGroups.filter(productGroup => tones.includes(productGroup.items[0].tone.toLowerCase()));
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    // const productGroups: IProductGroup[] = [];
    // products.forEach(product => {
    //     const productGroup = productGroups.find(group => group.key === product.group);
    //     if (productGroup) {
    //         productGroup.count += 1;
    //         productGroup.smallestPrice = Math.min(productGroup.smallestPrice, product.price);
    //         productGroup.items.push(product);
    //     } else {
    //         productGroups.push({
    //             key: product.group,
    //             count: 1,
    //             smallestPrice: product.price,
    //             items: [product]
    //         });
    //     }
    // });

    return NextResponse.json(productGroups);
}