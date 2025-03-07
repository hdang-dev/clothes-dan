"use client";

import { Flex, Spinner } from "@radix-ui/themes";
import { Filters, ProductGroupList } from "@/components";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { IProductGroup } from "@/interfaces";

export default function Home() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { data: productGroups } = useQuery<IProductGroup[]>({
    queryKey: ["product-groups"],
    queryFn: () => fetch("api/product-groups?" + searchParams.toString()).then((data) => data.json()),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["product-groups"] });
  }, [queryClient, searchParams]);

  return (
    <Flex width="100%" height="100%" pt="30px" gap="8">
      <Filters />
      <Flex flexGrow="1" direction="column" gap="3" justify={productGroups?.length ? "start" : "center"} align={productGroups?.length ? "start" : "center"}>
        {productGroups ? <ProductGroupList data={productGroups} /> : <Spinner size="3" />}
      </Flex>
    </Flex>
  );
}
