"use client";

import { AspectRatio, Box, Flex, Text, Button, SegmentedControl, Spinner } from "@radix-ui/themes";
import { EProductSize, IProduct } from "@/interfaces";
import { formatPrice } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SimilarProductList } from "@/components";

export default function ProductPage({ params }: { params: { productId: string; }; }) {
  const productId = params.productId;
  const [selectedSize, setSelectedSize] = useState<EProductSize>();
  const { data: product } = useQuery<IProduct>({
    queryKey: ["product", productId],
    queryFn: () => fetch(`/api/products/${productId}`).then((data) => data.json()),
  });
  const { data: similarProducts } = useQuery<IProduct[]>({
    queryKey: ["similar-products", productId],
    queryFn: () => fetch(`/api/similar-products/${productId}`).then((data) => data.json()),
  });

  const addToWishlist = () => { };

  const buyNow = () => { };

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  return (
    <Flex direction="column" py="5">
      {product ? (
        <Flex gap="9">
          <Box minWidth="500px">
            <AspectRatio ratio={1 / 1}>
              <Image src={product.imageSrc} alt={product.name} width={200} height={100} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </AspectRatio>
          </Box>
          <Box>
            <Flex direction="column" gap="4">
              <Text size="7" weight="bold" style={{ fontFamily: "Sansita Swashed, cursive" }}>
                {product.name}
              </Text>
              <Text>{product.sku}</Text>
              <Box>
                <SegmentedControl.Root value={selectedSize} size="3" onValueChange={(value) => setSelectedSize(value as EProductSize)}>
                  {product.sizes.map((size) => (
                    <SegmentedControl.Item key={size} value={size}>
                      {size}
                    </SegmentedControl.Item>
                  ))}
                </SegmentedControl.Root>
              </Box>

              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                unchanged.
              </Text>
              <Text size="7" weight="bold">
                {formatPrice(product.price)}
              </Text>
              <Flex gap="4">
                <Button size="3">Add to Wishlist</Button>
                <Button size="3">Buy Now</Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Flex width="100%" height="100%" align="center" justify="center">
          <Spinner size="3" />
        </Flex>
      )}
      {similarProducts ? (
        <SimilarProductList products={similarProducts} />
      ) : (
        <Flex width="100%" height="100%" align="center" justify="center">
          <Spinner size="3" />
        </Flex>
      )}
    </Flex>
  );
}
