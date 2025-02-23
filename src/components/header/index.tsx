"use client";

import { AvatarIcon, HeartIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Text, Flex, IconButton, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Header({ onClickLogo, onSearch, reset }: { onClickLogo?: () => void; onSearch: (text: string) => void; reset?: number }) {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");

  const changeValue = (value: string) => {
    setSearchText(value);
    onSearch(value);
  };

  useEffect(() => {
    setSearchText("");
  }, [reset]);

  return (
    <Flex width="100%" justify="between" py="6">
      {/* Logo */}
      <Link href="/" onClick={() => onClickLogo?.()}>
        <Text size="7" style={{ fontFamily: "Sansita Swashed, cursive" }}>
          Clothes Dan
        </Text>
      </Link>

      {/* Search bar */}
      <Box minWidth="500px">
        <TextField.Root value={searchText} placeholder="Find product…" onChange={(event) => changeValue(event.target.value)}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="22" width="22" />
          </TextField.Slot>
        </TextField.Root>
      </Box>

      {/* Icons */}
      <Flex gap="3">
        <IconButton variant="ghost">
          <HeartIcon width="22" height="22" />
        </IconButton>
        <IconButton variant="ghost">
          <AvatarIcon width="22" height="22" />
        </IconButton>
      </Flex>
    </Flex>
  );
}
