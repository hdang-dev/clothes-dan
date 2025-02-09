import { IProduct } from "@/interfaces";
import { formatPrice, colorTone } from "@/utils";
import { Card, Inset, Flex, Text, AspectRatio, Box } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

export function ProductCard({ product }: { product: IProduct }) {
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
      <Flex direction="column" align="center" gap="2">
        <Text size="4" style={{ fontFamily: "Sansita Swashed, cursive" }}>
          {product.name}
        </Text>
        <Text>{formatPrice(product.price)}</Text>
        <Flex gap="3">
          {product.tones.map((tone, index) => (
            <RoundedBox key={index} backgroundColor={colorTone(tone)} />
          ))}
        </Flex>
        <Flex gap="3">
          {product.sizes.map((size, index) => (
            <Text key={index} size="5">
              {size}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}

function RoundedBox({ backgroundColor, children }: { backgroundColor?: string; children?: React.ReactNode }) {
  return (
    <Box width="30px" height="30px" style={{ backgroundColor: backgroundColor, borderRadius: "100%", boxShadow: "var(--shadow-3)", display: "grid", placeItems: "center" }}>
      {children}
    </Box>
  );
}
