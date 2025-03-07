import { Grid, Text } from "@radix-ui/themes";
import { ProductGroupCard } from "../productGroupCard";
import { IProductGroup } from "@/interfaces";

export function SimilarProductGroupList({ data }: { data: IProductGroup[]; }) {
    return (
        <>
            <Text as="p" size="5" weight="medium" mb="4">Similar Products</Text>
            <Grid columns="4" gap="5">
                {data.map(productGroup => (
                    <ProductGroupCard key={productGroup.key} data={productGroup} />
                ))}
            </Grid>
        </>
    );
}
