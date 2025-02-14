'use client';

import { AvatarIcon, HeartIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Text, Flex, IconButton, TextField } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { debounce } from "lodash";

export function Header() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const searchText = searchParams.get('search') || '';

  const search = (text: string) => {
    const trimedText = text.trim();
    if (searchText !== trimedText) {
      const params = new URLSearchParams(searchParams);
      if (trimedText !== '') {
        params.set('search', trimedText);
      } else {
        params.delete('search');
      }
      router.push(`${pathName}?${params.toString()}`);
    }
  };

  const debounceSearch = debounce((text: string) => {
    search(text);
  }, 800);

  return (
    <Flex width="100%" justify="between" py="6">
      <Logo />
      <SearchBar defaultValue={searchText} onChange={(value) => debounceSearch(value)} />
      <Flex gap="3">
        <Cart />
        <Avatar />
      </Flex>
    </Flex>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Text size="7" style={{ fontFamily: "Sansita Swashed, cursive" }}>
        Clothes Dan
      </Text>
    </Link>
  );
}

function SearchBar({ defaultValue, onChange }: { defaultValue: string, onChange: (value: string) => void; }) {
  return (
    <Box minWidth="500px">
      <TextField.Root defaultValue={defaultValue} placeholder="Find product…" onChange={(event) => onChange(event.target.value)}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="22" width="22" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
}

function Cart() {
  return (
    <IconButton variant="ghost">
      <HeartIcon width="22" height="22" />
    </IconButton>
  );
}

function Avatar() {
  return (
    <IconButton variant="ghost">
      <AvatarIcon width="22" height="22" />
    </IconButton>
  );
}
