import { MotionButton } from "@/components/motion-chakra/motion-chakra-components";
import { PasswordInput } from "@/components/ui/password-input";
import { Fieldset, Field, InputGroup, Input, Center, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiArrowRightLine } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { callRegisterEndpoint } from "../api";
import { RegisterDto } from "../auth.dto";
import { toaster, Toaster } from "@/components/ui/toaster";
const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.email({ error: "Invalid: must be an email" }).nonempty(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Invalid: passwords do not match",
    path: ["confirmPassword"],
    when(payload) {
      return registerSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  }); //creating zod register schema to be used in the form

type RegisterTypeSchema = z.infer<typeof registerSchema>; //Defining zod type to use within typescript

export default function RegisterForm() {
  const form = useForm<RegisterTypeSchema>({
    resolver: zodResolver(registerSchema), //using rhf integration with zod to resolve types and schemas
  });
  const register = useMutation({
    mutationFn: callRegisterEndpoint,
    onError: (err) => {
      toaster.create({
        title: "Error",
        closable: true,
        type: "error",
        description: err.message,
      });
    },
    onSuccess: () => {
      toaster.create({
        title: "Created",
        closable: true,
        type: "success",
        description: "Your account has been created."
      })
    }
  });

  function handleRegisterForm(form: RegisterTypeSchema | RegisterDto) {
    register.mutate(form as RegisterDto);
  } //function to handle with data and submit
  return (
    <Fieldset.Root>
      <Toaster />
      <Fieldset.Content gap={3} asChild>
        <form
          onSubmit={form.handleSubmit(handleRegisterForm)}
          noValidate={true}
        >
          {/* field name */}
          <Field.Root invalid={!!form.formState.errors.name?.message} required>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<FaUser />}>
              <Input
                type="text"
                placeholder="Enter your full name..."
                {...form.register("name")}
              />
            </InputGroup>
            <Field.ErrorText>
              {form.formState.errors.name?.message}
            </Field.ErrorText>
          </Field.Root>

          {/* field email */}
          <Field.Root invalid={!!form.formState.errors.email?.message} required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<MdEmail />}>
              <Input
                type="email"
                placeholder="Enter your email..."
                {...form.register("email")}
              />
            </InputGroup>
            <Field.ErrorText>
              {form.formState.errors.email?.message}
            </Field.ErrorText>
          </Field.Root>

          {/* field password */}
          <Field.Root invalid={!!form.formState.errors.password} required>
            <Field.Label>
              Password <Field.RequiredIndicator />{" "}
            </Field.Label>
            <InputGroup startElement={<TbLockPassword />}>
              <PasswordInput
                {...form.register("password")}
                placeholder="Enter your password..."
              />
            </InputGroup>
            <Field.ErrorText>
              {form.formState.errors.password?.message}
            </Field.ErrorText>
          </Field.Root>

          {/* field confirm password */}
          <Field.Root
            invalid={!!form.formState.errors.confirmPassword?.message}
            required
          >
            <Field.Label>
              Repeat your password <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<TbLockPassword />}>
              <PasswordInput
                {...form.register("confirmPassword")}
                placeholder="Confirm your password..."
              />
            </InputGroup>
            <Field.ErrorText>
              {form.formState.errors.confirmPassword?.message}
            </Field.ErrorText>
          </Field.Root>

          {/* Submit button */}
          <MotionButton
            type="submit"
            disabled={register.isPending}
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
            {register.isPending === true ? (
              <Center gap={3}>
                <Spinner size={"sm"} /> Creating... 
              </Center>
            ) : (
              <Center>
                Create account <RiArrowRightLine />
              </Center>
            )}
          </MotionButton>
        </form>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}
