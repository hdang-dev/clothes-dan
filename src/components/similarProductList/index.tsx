"use client";

import { Flex, Grid, Select, Text } from "@radix-ui/themes";
import { ProductCard } from "../productCard";
import { ESortType, IProduct } from "@/interfaces";
import { useState } from "react";

export function SimilarProductList({ products }: { products: IProduct[]; }) {
    return (
        <Grid columns="4" gap="3">
            {products.map(product => (
                <ProductCard key={product.sku} product={product} />
            ))}
        </Grid>
    );
}
