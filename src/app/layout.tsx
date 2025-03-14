import type { Metadata } from "next";
import QueryProvider from "@/providers/queryProvider";
import { Flex, Theme } from "@radix-ui/themes";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Header, Footer } from "@/components";
import { StoreProvider } from "./StoreProvider";

export const metadata: Metadata = {
  title: "Clothes Dan",
  description: "Clothes Shop, design and code by Dan",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider >
          <Theme>
            <QueryProvider>
              <Flex justify="center">
                <Flex direction="column" align="center" width="100%" maxWidth="1200px" minHeight="100vh" px="5">
                  <Header />
                  <Flex flexGrow="1" width="100%" justify="center">
                    {children}
                  </Flex>
                  <Footer />
                </Flex>
              </Flex>
            </QueryProvider>
          </Theme>
        </StoreProvider>
      </body>
    </html>
  );
}