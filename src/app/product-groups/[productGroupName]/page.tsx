"use client";

import { AspectRatio, Box, Flex, Text, Button, SegmentedControl, Spinner } from "@radix-ui/themes";
import { IProduct, IProductGroup } from "@/interfaces";
import { formatPrice } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SimilarProductGroupList } from "@/components";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addWishListItem, removeWishListItem } from "@/lib/reducers/wishListSlice";
import { useParams, useRouter } from "next/navigation";

export default function ProductPage() {
  const { productGroupName } = useParams<{ productGroupName: string; }>();
  const [product, setProduct] = useState<IProduct>();
  const { data: productGroup } = useQuery<IProductGroup>({
    queryKey: ["product-groups", productGroupName],
    queryFn: () => fetch(`/api/product-groups/${productGroupName}`).then((data) => data.json()),
  });
  const { data: similarProductGroups } = useQuery<IProductGroup[]>({
    queryKey: ["similar-product-groups", productGroupName],
    queryFn: () => fetch(`/api/similar-product-groups/${productGroupName}`).then((data) => data.json()),
  });
  const isWishListItem = useAppSelector(state => state.wishList).filter(item => item.product.id === product?.id).length > 0;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const addWishList = (product: IProduct) => {
    dispatch(addWishListItem(product));
  };
  const removeWishList = (product: IProduct) => {
    dispatch(removeWishListItem(product));
  };
  const buyNow = () => {
    router.push('/wishlist');
  };

  useEffect(() => {
    if (productGroup) {
      setProduct(productGroup.items[0]);
    }
  }, [productGroup]);

  return (
    <Flex direction="column" width="100%" py="7">
      {(product && productGroup) ? (
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
              <Text>{product.id}</Text>
              <Box>
                <SegmentedControl.Root value={product.size} size="3" >
                  {productGroup.items.map((product) => (
                    <SegmentedControl.Item key={product.id} value={product.size} onClick={() => setProduct(product)}>
                      {product.size}
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
                {isWishListItem ? (
                  <>
                    <Button size="3" onClick={() => removeWishList(product)}>Remove from wishlist</Button>
                    <Button size="3" onClick={() => buyNow()}>Buy now</Button>
                  </>
                ) : (
                  <Button size="3" variant="outline" onClick={() => addWishList(product)}>Add to wishlist</Button>
                )}
              </Flex>
            </Flex>
          </Box>
        </Flex >
      ) : (
        <Flex width="100%" height="100%" align="center" justify="center">
          <Spinner size="3" />
        </Flex>
      )
      }

      {
        similarProductGroups ? (
          <SimilarProductGroupList data={similarProductGroups} />
        ) : (
          <Flex width="100%" height="100%" align="center" justify="center">
            <Spinner size="3" />
          </Flex>
        )
      }
      <Flex width="100%" height="100%" align="center" justify="center">
        <Spinner size="3" />
      </Flex>
    </Flex >
  );
}
