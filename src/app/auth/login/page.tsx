"use client";
import {
  Card,
  Heading,
  Flex,
  Button,
  Text,
  Separator,
  Icon,
  VStack,
  HStack,
  Link,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import LoginForm from "./login-form";
import { MotionButton, MotionCard } from "@/components/motion-chakra/motion-chakra-components";
export default function Login() {
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
              Welcome back!
            </Heading>
            <Text textStyle={"md"} color={"fg.muted"}>
              Dont have an account yet?{" "}
              <Link
                color={"green.fg"}
                variant={"underline"}
                href="/auth/register"
              >
                Sign-in
              </Link>
            </Text>
          </VStack>
          <Separator marginY={"4"} />
          <LoginForm />
        </Card.Body>
      </MotionCard>
    </Flex>
  );
}
