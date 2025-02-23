import { Footer, Header } from "@/components";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const productId = (await params).productId;
  //   const searchParams = useSearchParams();
  return (
    <>
      {/* <Header initialSearchText="" onSearch={() => { }} /> */}
      <div>{productId}</div>
      <Footer />
    </>
  );
}
