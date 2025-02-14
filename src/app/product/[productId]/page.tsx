export default async function ProductPage({ params }: { params: Promise<{ productId: string; }>; }) {
    const productId = (await params).productId;
    return <div>abc {productId}</div>;
}