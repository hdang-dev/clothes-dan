import { AvatarIcon, HeartIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Text, Flex, IconButton, TextField } from "@radix-ui/themes";
import Link from "next/link";

export default function Header() {
  return (
    <Flex width="100%" justify="between" py="6">
      <Logo />
      <SearchBar />
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

function SearchBar() {
  return (
    <Box minWidth="500px">
      <TextField.Root placeholder="Find product…">
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
