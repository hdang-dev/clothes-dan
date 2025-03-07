import { IProductGroup } from "@/interfaces";
import { formatPrice } from "@/utils";
import { Card, Inset, Flex, Text, AspectRatio } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export function ProductGroupCard({ data }: { data: IProductGroup; }) {
  return (
    <Link href={`/product-groups/${data.key}`}>
      <Card>
        <Inset clip="padding-box" side="top">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={data.items[0].imageSrc}
              alt={data.items[0].name}
              width={200}
              height={100}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </AspectRatio>
        </Inset>
        <Flex direction="column" align="center" gap="1">
          <Text style={{ fontFamily: "Sansita Swashed, cursive" }}>
            {data.items[0].name}
          </Text>
          <Text>{formatPrice(data.lowestPrice)}</Text>
          <Flex gap="3">
            {data.items.map((item, index) => (
              <Text key={index}>{item.size}</Text>
            ))}
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
}
