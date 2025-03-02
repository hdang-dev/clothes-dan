import type { Metadata } from "next";
import QueryProvider from "@/providers/queryProvider";
import { Flex, Theme } from "@radix-ui/themes";

import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Header, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Clothes Dan",
  description: "Clothes Shop, design and code by Dan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <QueryProvider>
            <Flex justify="center">
              <Flex direction="column" align="center" width="100%" maxWidth="1200px" minHeight="100vh" px="5">
                <Header />
                <Flex flexGrow="1" width="100%" justify="center" align="center">
                  {children}
                </Flex>
                <Footer />
              </Flex>
            </Flex>
          </QueryProvider>
        </Theme>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
