"use client";
import {
  Card,
  Heading,
  Flex,
  Text,
  Separator,
  Icon,
  VStack,
  HStack,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import RegisterForm from "./register-form";
import { MotionCard } from "@/components/motion-chakra/motion-chakra-components";

export default function Register() {
  return (
    <Flex
      w={"vw"}
      h={"vh"}
      align={"center"}
      direction={"column"}
      justify={"center"}
      gap={"2"}
    >
      <MotionCard
        size={"lg"}
        w={"1/4"}
        boxShadow={"xl"}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <Card.Body>
          <VStack w="full" textAlign={"center"}>
            <Heading fontWeight={"bold"} size={"2xl"}>
              Nice to meet you!
            </Heading>
            <Text textStyle={"md"} color={"fg.muted"}>
              already have an account?{" "}
              <Link color={"green.fg"} variant={"underline"} href="/auth/login">
                Log-in
              </Link>
            </Text>
            <HStack>
              <IconButton variant="ghost">
                <FaGoogle />
              </IconButton>
              <IconButton variant="ghost">
                <Icon size="lg">
                  <FaApple />
                </Icon>
              </IconButton>
            </HStack>
          </VStack>
          <HStack marginY={"4"}>
            <Separator flex={"1"} />
            <Text flexShrink={"0"} fontSize={"sm"} color="fg.muted">
              Or provide your information
            </Text>
            <Separator flex={"1"} />
          </HStack>
          <RegisterForm />
        </Card.Body>
      </MotionCard>
    </Flex>
  );
}
