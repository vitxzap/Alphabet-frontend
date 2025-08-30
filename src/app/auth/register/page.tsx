"use client";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
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
  IconButton,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaApple } from "react-icons/fa";

import { motion } from "framer-motion";
import { TbLockPassword } from "react-icons/tb";
import { useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
const MotionCard = motion(Card.Root);
const MotionButton = motion(Button);
export default function Login() {
  const [strengthValue, setStrengthValue] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  function isUserPasswordStrongEnough(password: string) {
    //variables to define password complexity level
    const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const numberFormat = /\d/;
    const upperCaseFormat = /[A-Z]/;
    const passwordMinimumSize = 8;
    const passwordMediumSize = 12;
    let passwordComplexityPassedLevels = 0;

    if (password.length >= passwordMinimumSize) {
      passwordComplexityPassedLevels++;
    }
    if (password.length >= passwordMediumSize) {
      passwordComplexityPassedLevels++;
    }
    if (specialCharacterFormat.test(password) && password.length >= 4) {
      passwordComplexityPassedLevels++;
    }
    if (numberFormat.test(password) && password.length >= 4) {
      passwordComplexityPassedLevels++;
    }
    if (upperCaseFormat.test(password) && password.length >= 4) {
      passwordComplexityPassedLevels++;
    }
    setStrengthValue(passwordComplexityPassedLevels);
  }
  useEffect(() => {
    isUserPasswordStrongEnough(password);
  }, [password]);
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
        scale={"1.1"}
        w={"1/4"}
        boxShadow={"xl"}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <Card.Body>
          <VStack w="full" textAlign={"center"}>
            <Heading fontWeight={"black"} size={"2xl"}>
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
          <Fieldset.Root>
            {" "}
            {/* Start of fieldset */}
            <Fieldset.Content>
              <Field.Root>
                {" "}
                {/* field name */}
                <Field.Label>Name</Field.Label>
                <HStack w="full">
                  <InputGroup>
                    <Input type="text" placeholder="First name" />
                  </InputGroup>
                  <InputGroup>
                    <Input type="text" placeholder="Last name" />
                  </InputGroup>
                </HStack>
              </Field.Root>

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
              <Field.Root>
                <Field.Label>Repeat your password</Field.Label>
                <InputGroup startElement={<TbLockPassword />}>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Confirm your password..."
                  />
                </InputGroup>

                <PasswordStrengthMeter w="full" value={strengthValue} />
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>{" "}
          {/* End of fieldset */}
        </Card.Body>
        <Card.Footer>
          <VStack w="full">
            <MotionButton
              colorPalette={"green"}
              variant="outline"
              width={"full"}
              disabled={(strengthValue == 3 ? false : true)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.02,
                scale: { type: "spring", visualDuration: 0.02, bounce: 0.06 },
              }}
            >
              Create account <RiArrowRightLine />
            </MotionButton>
          </VStack>
        </Card.Footer>
      </MotionCard>
    </Flex>
  );
}
