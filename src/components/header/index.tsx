"use client";

import { AvatarIcon, HeartIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Text, Flex, IconButton, TextField } from "@radix-ui/themes";
import { debounce } from "lodash";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function Header() {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  const router = useRouter();
  const pathName = usePathname();

  const changeValue = (value: string) => {
    setSearchText(value);
    debounceChangeSearchText(value);
  };

  const debounceChangeSearchText = useMemo(
    () =>
      debounce((text: string) => {
        const params = new URLSearchParams(searchParams);
        if (text === "") {
          params.delete("search");
        } else {
          params.set("search", text);
        }
        router.push(`${pathName}?${params.toString()}`);
      }, 500),
    [searchParams]
  );

  useEffect(() => {
    return () => {
      debounceChangeSearchText.cancel();
    };
  }, [debounceChangeSearchText]);

  return (
    <Flex width="100%" justify="between" py="6">
      {/* Logo */}
      <Link href="/" onClick={() => {}}>
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
