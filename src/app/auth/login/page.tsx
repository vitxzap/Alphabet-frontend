"use client";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  Field,
  Fieldset,
  Heading,
  Flex,
  Input,
  Button,
  Text,
  Separator,
  Icon,
  VStack,
  HStack,
  InputGroup,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaApple } from "react-icons/fa";

import { motion } from "framer-motion";
import { TbLockPassword } from "react-icons/tb";
const MotionCard = motion(Card.Root);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);
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
            <Heading fontWeight={"black"} size={"2xl"}>
              Welcome back!
            </Heading>
            <Text textStyle={"md"} color={"fg.muted"}>
              Dont have an account yet?{" "}
              <Link color={"green.fg"} variant={"underline"} href="/auth/register">
                Sign-in
              </Link>
            </Text>
          </VStack>
          <Separator marginY={"4"} />
          <Fieldset.Root>
            {" "}
            {/* Start of fieldset */}
            <Fieldset.Content>
              <Field.Root>
                {" "}
                {/* field email */}
                <Field.Label>Email</Field.Label>
                <InputGroup startElement={<MdEmail />}>
                  <Input type="email" placeholder="Enter your email..." />
                </InputGroup>
              </Field.Root>
              <Field.Root>
                {" "}
                {/* field password */}
                <Field.Label>Password</Field.Label>
                <InputGroup startElement={<TbLockPassword />}>
                  <PasswordInput placeholder="Enter your password..." />
                </InputGroup>
              </Field.Root>
              <HStack justify={"space-between"}>
                {/* remember me checkbox */}
                <Checkbox.Root size={"sm"}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control cursor={"button"} />
                  <Checkbox.Label>Remember Me</Checkbox.Label>
                </Checkbox.Root>
                 {/* Forgot your password Link */}
                <Link variant={"underline"} fontSize={"sm"}>Forgot your password?</Link>
              </HStack>
            </Fieldset.Content>
          </Fieldset.Root>{" "}
          {/* End of fieldset */}
        </Card.Body>
        <Card.Footer>
          <VStack w="full">
            <MotionButton
              colorPalette={"green"}
              width={"full"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.02,
                scale: { type: "spring", visualDuration: 0.02, bounce: 0.06 },
              }}
            >
              Continue
            </MotionButton>
            <HStack w="full">
              <Separator flex="1" w="full" />
              <Text flexShrink={"0"} color={"fg.muted"} fontSize={"sm"}>
                You can also
              </Text>
              <Separator flex="1" w="full" />
            </HStack>
            <MotionButton
              variant={"outline"}
              w="full"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.02,
                scale: { type: "spring", visualDuration: 0.02, bounce: 0.06 },
              }}
            >
              <Icon size={"sm"}>
                <FaGoogle />
              </Icon>
              Continue with Google
            </MotionButton>
            <MotionButton
              variant={"outline"}
              w="full"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.02,
                scale: { type: "spring", visualDuration: 0.02, bounce: 0.06 },
              }}
            >
              <Icon size={"md"}>
                <FaApple />
              </Icon>
              Continue with Apple
            </MotionButton>
          </VStack>
        </Card.Footer>
      </MotionCard>
    </Flex>
  );
}
