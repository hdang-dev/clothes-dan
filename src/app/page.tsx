import { Flex } from "@radix-ui/themes";
import { Filter, ProductList } from "@/components";

export default function Home() {
  return (
    <Flex width="100%" pt="30px" gap="8">
      <Filter />
      <ProductList />
    </Flex>
  );
}
