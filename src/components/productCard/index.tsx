import { IProduct } from "@/interfaces";
import { formatPrice } from "@/utils";
import { Card, Inset, Flex, Text, AspectRatio } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

export function ProductCard({ product }: { product: IProduct; }) {
  return (
    <Card>
      <Inset clip="padding-box" side="top">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={product.imageSrc}
            // src="https://img.freepik.com/free-photo/great-blue-hat_1203-1941.jpg?ga=GA1.1.844083129.1727363790&semt=ais_hybrid"
            alt={product.name}
            width={200}
            height={100}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </AspectRatio>
      </Inset>
      <Flex direction="column" align="center" gap="1">
        <Text style={{ fontFamily: "Sansita Swashed, cursive" }}>
          {product.name}
        </Text>
        <Text>{formatPrice(product.price)}</Text>
        <Flex gap="3">
          {product.sizes.map((size, index) => (
            <Text key={index}>{size}</Text>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
