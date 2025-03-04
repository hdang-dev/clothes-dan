/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AvatarIcon, HeartIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Text, Flex, IconButton, TextField } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Header() {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  const router = useRouter();
  const pathName = usePathname();

  const handleClickLogo = () => {
    if (pathName !== "/") {
      router.push("/");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchText === "") {
        params.delete("search");
      } else {
        params.set("search", searchText);
      }
      router.push(`/?${params.toString()}`);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  return (
    <Flex width="100%" justify="between" align="center" py="6">
      {/* Logo */}
      <Text size="7" style={{ fontFamily: "Sansita Swashed, cursive", cursor: "pointer" }} onClick={() => handleClickLogo()}>
        Clothes Dan
      </Text>

      {/* Search bar */}
      <Box minWidth="500px">
        <TextField.Root value={searchText} placeholder="Find product…" onChange={(event) => setSearchText(event.target.value)}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="22" width="22" />
          </TextField.Slot>
        </TextField.Root>
      </Box>

      {/* Icons */}
      <Flex gap="3">
        <Link href="/wishlist">
          <IconButton variant="ghost">
            <HeartIcon width="22" height="22" />
          </IconButton>
        </Link>
        <IconButton variant="ghost">
          <AvatarIcon width="22" height="22" />
        </IconButton>
      </Flex>
    </Flex>
  );
}
