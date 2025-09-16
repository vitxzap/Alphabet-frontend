import { MotionButton } from "@/components/motion-chakra/motion-chakra-components";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Fieldset,
  Field,
  InputGroup,
  Input,
  HStack,
  Link,
  Checkbox,
  Icon,
  Separator,
  VStack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useController, useForm } from "react-hook-form";
import { FaGoogle, FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiArrowRightLine } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import z from "zod";

const loginSchema = z.object({
  email: z.email({error: "Invalid: must be an email"}).nonempty().nonoptional(),
  password: z.string().nonempty({error: "Invalid: must not be empty"}).nonoptional(),
  rememberMe: z.boolean().optional(),
});
type LoginTypeSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginTypeSchema>({
    resolver: zodResolver(loginSchema),
  });
  function handleLoginSubmit(data: LoginTypeSchema) {
    console.log(data);
  }
  return (
    <Fieldset.Root>
      <Fieldset.Content asChild>
        <form onSubmit={form.handleSubmit(handleLoginSubmit)} noValidate={true}>
          <Field.Root invalid={!!form.formState.errors.email?.message} required>
            {/* field email */}
            <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
            <InputGroup startElement={<MdEmail />}>
              <Input
                type="email"
                placeholder="Enter your email..."
                {...form.register("email")}
              />
            </InputGroup>
            <Field.ErrorText>{form.formState.errors.email?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!form.formState.errors.password?.message} required> {/* field password */}
            <Field.Label>Password <Field.RequiredIndicator /></Field.Label>
            <InputGroup startElement={<TbLockPassword />}>
              <PasswordInput
                placeholder="Enter your password..."
                {...form.register("password")}
              />
            </InputGroup>
            <Field.ErrorText>{form.formState.errors.password?.message}</Field.ErrorText>
          </Field.Root>
          <HStack justify={"space-between"}>
            {/* remember me checkbox */}
            <Controller
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <Checkbox.Root
                  size={"sm"}
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember Me</Checkbox.Label>
                </Checkbox.Root>
              )}
            />
            {/* Forgot your password Link */}
            <Link variant={"underline"} fontSize={"sm"}>
              Forgot your password?
            </Link>
          </HStack>
          <MotionButton
            type={"submit"}
            colorPalette={"green"}
            variant="outline"
            width={"full"}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.02,
              scale: { type: "spring", visualDuration: 0.02, bounce: 0.06 },
            }}
          >
            Continue <RiArrowRightLine />
          </MotionButton>
          <VStack w="full">
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
        </form>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}
