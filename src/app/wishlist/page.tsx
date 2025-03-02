"use client";

import { Footer, Header } from "@/components";
import { EProductSize, IProduct } from "@/interfaces";
import { TWishList } from "@/interfaces/wishlist";
import { PRODUCTS } from "@/mock";
import { formatPrice } from "@/utils";
import { AspectRatio, Box, Flex, Grid, Section, Text, Button, SegmentedControl, Table, Card } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const WISH_LIST: TWishList = [
  { product: PRODUCTS[1], selectedSize: EProductSize.L, count: 1 },
  { product: PRODUCTS[5], selectedSize: EProductSize.M, count: 1 },
  { product: PRODUCTS[22], selectedSize: EProductSize.S, count: 3 },
  { product: PRODUCTS[17], selectedSize: EProductSize.M, count: 2 },
];

export default function WishListPage() {
  const [wishList, setWishList] = useState<TWishList>(WISH_LIST);
  const totalPrice = useMemo(() => {
    return wishList.reduce((accum, item) => accum + item.product.price * item.count, 0);
  }, [wishList]);

  return (
    <>
      <Section width="100%">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Product Image</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Detail</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Count</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {wishList.map(({ product, selectedSize, count }) => (
              <Table.Row key={product.sku}>
                <Table.RowHeaderCell>
                  <Link href={`/product/${product.sku}`}>
                    <Image src={product.imageSrc} alt={product.name} width={200} height={100} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                  </Link>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Text as="p">Name: {product.name}</Text>
                  <Text as="p">Size: {selectedSize}</Text>
                </Table.Cell>
                <Table.Cell>x{count}</Table.Cell>
                <Table.Cell>{formatPrice(product.price)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Flex justify="end">
          <Text>Total: {formatPrice(totalPrice)}</Text>
        </Flex>
      </Section>

      <Section>
        <Card></Card>
      </Section>
    </>
  );
}
