"use client";

import { Footer, Header } from "@/components";
import { EProductSize, IProduct } from "@/interfaces";
import { IWishListItem, TWishList } from "@/interfaces/wishlist";
import { PRODUCTS } from "@/mock";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatPrice } from "@/utils";
import { AspectRatio, Box, Flex, Grid, Section, Text, Button, SegmentedControl, Table, Card, Checkbox, TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { changeWishListItem } from "@/lib/reducers/wishListSlice";

export default function WishListPage() {
  const wishList = useAppSelector(state => state.wishList);
  const totalPrice = useMemo(() => {
    return wishList.reduce((accum, item) => accum + item.product.price * item.count, 0);
  }, [wishList]);
  const dispatch = useAppDispatch();
  const changeWishListCount = (wishListItem: IWishListItem) => {
    dispatch(changeWishListItem(wishListItem));
  };

  return (
    <>
      <Section width="100%">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Select</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Product Image</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Detail</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Count</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {wishList.map(({ product, count }) => (
              <Table.Row key={product.id} align="center">
                <Table.Cell>
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/product-groups/${product.group}`}>
                    <Image src={product.imageSrc} alt={product.name} width={200} height={100} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Text as="p">{product.name}</Text>
                  <Text as="p">Size: {product.size}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Box width="50px">
                    <TextField.Root type="number" size="3" value={count} onChange={(e) => changeWishListCount({ product, count: e.target.value as unknown as number })} />
                  </Box>
                </Table.Cell>
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
