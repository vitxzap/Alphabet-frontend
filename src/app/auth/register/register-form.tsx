import { MotionButton } from "@/components/motion-chakra/motion-chakra-components";
import { PasswordInput } from "@/components/ui/password-input";
import { Fieldset, Field, InputGroup, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiArrowRightLine } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

  function handleRegisterForm(data: RegisterTypeSchema) {
    console.log(data);
  } //function to handle with data and submit
  return (
    <Fieldset.Root>
      <Fieldset.Content gap={3} asChild>
        <form onSubmit={form.handleSubmit(handleRegisterForm)} noValidate={true}>
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
            <Field.Label>Password <Field.RequiredIndicator /> </Field.Label>
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
            Create account <RiArrowRightLine />
          </MotionButton>
        </form>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}
