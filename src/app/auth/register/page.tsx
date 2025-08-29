import { Center, VStack, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Register() {
  return (
    <Center>
      <VStack>
        Register page.
        <Button asChild>
          <Link href={"/auth/login"}>back to login page</Link>
        </Button>
      </VStack>
    </Center>
  );
}
