import { Box, Button, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  // data is loading
  if (fetching) {
  }
  // user not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  }
  // user is logged in
  else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="link"
          isLoading={logoutFetching}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex zIndex={2} position="sticky" top={0} bg="tan" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
