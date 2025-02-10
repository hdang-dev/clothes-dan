import type { Metadata } from "next";
import QueryProvider from "@/providers/queryProvider";
import { Flex, Grid, Theme } from "@radix-ui/themes";
import "./globals.css";
import "@radix-ui/themes/styles.css";

export const metadata: Metadata = {
  title: "Clothes Dan",
  description: "Clothes Shop, design and code by Dan",
};

export default function RootLayout({
  children,
  header,
  footer,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <QueryProvider>
            <Flex justify="center">
              <Flex direction="column" align="center" width="100%" maxWidth="1200px" minHeight="100vh" px="5">
                {header}
                <Flex flexGrow="1" width="100%" justify="center" align="center">
                  {children}
                </Flex>
                {footer}
              </Flex>
            </Flex>
          </QueryProvider>
        </Theme>
      </body>
    </html>
  );
}
