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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
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
      <MotionHeading
        size={"4xl"}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        Good to see you again!
      </MotionHeading>
      <MotionCard
        size={"lg"}
        w={"1/3"}
        boxShadow={"xl"}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <Card.Body>
          <Flex w="full" justify={"center"}>
            <Text fontWeight={"bold"}>
              Please, provide your information to continue
            </Text>
          </Flex>
          <Separator marginY={"4"} />
          <Fieldset.Root>
            {" "}
            {/* Start of fieldset */}
            <Fieldset.Content>
              <Field.Root>
                {" "}
                {/* field name */}
                <Field.Label>Email label</Field.Label>
                <Input type="email" placeholder="Placeholder" />
              </Field.Root>
              <Field.Root>
                {" "}
                {/* field email */}
                <Field.Label>Email label</Field.Label>
                <Input type="email" placeholder="Placeholder" />
              </Field.Root>
              <Field.Root>
                {" "}
                {/* field password */}
                <Field.Label>Password label</Field.Label>
                <PasswordInput placeholder="Password placeholder" />
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>{" "}
          {/* End of fieldset */}
        </Card.Body>
        <Card.Footer>
          <Flex width="full" justify={"end"} align={"end"}>
            <MotionButton
              colorPalette={"green"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                duration: 0.02,
                scale: { type: "spring", visualDuration: 0.02, bounce: 0.04 },
              }}
            >
              Login
            </MotionButton>
          </Flex>
        </Card.Footer>
      </MotionCard>
    </Flex>
  );
}
