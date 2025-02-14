import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "../../../mock";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    let products = PRODUCTS;

    for (const entry of searchParams.entries()) {
        const [key, value] = [entry[0], entry[1].toLowerCase()];
        if (value !== '') {
            switch (key) {
                case 'search': {
                    products = products.filter(product => product.name.toLowerCase().includes(value));
                    break;
                }
                case 'categories': {
                    const categories = value.split(',').filter(item => item !== '');
                    products = products.filter(product => categories.includes(product.category.toLowerCase()));
                    break;
                }
                case 'minPrice': {
                    const minPrice = Number(value);
                    products = products.filter(product => product.price >= minPrice);
                    break;
                }
                case 'maxPrice': {
                    const maxPrice = Number(value);
                    products = products.filter(product => product.price <= maxPrice);
                    break;
                }
                case 'sizes': {
                    const sizes = value.split(',').filter(item => item !== '');
                    const productsBySizes = sizes.map(size => {
                        const productsBySize = products.filter(product => {
                            const lowerCaseProductSize = product.sizes.map(productSize => productSize.toLowerCase());
                            return lowerCaseProductSize.includes(size);
                        });
                        return productsBySize;
                    });
                    products = [...new Set(productsBySizes.reduce((totalProducts, productsBySize) => ([...totalProducts, ...productsBySize]), []))];
                    break;
                }
                case 'tones': {
                    const tones = value.split(',').filter(item => item !== '');
                    products = products.filter(product => tones.includes(product.tone.toLowerCase()));
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    return NextResponse.json(products);
}