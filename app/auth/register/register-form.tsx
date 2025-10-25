"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LucideArrowRight,
  LucideCircleX,
  LucideMail,
  LucideUser,
  LucideUserRoundCheck,
} from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { Field } from "@/components/Field";
import { authClient, Session } from "@/lib/auth-client";
import { RegisterDto } from "./register-dto";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { AuthMachineComponentProps } from "../auth-machine";
import { useAuthStore } from "../auth-global-state";
import LoadingButton from "../components/loading-button";
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
interface RegisterFormProps
  extends React.ComponentProps<"div">,
    AuthMachineComponentProps<{
      login: {
        callback: () => void;
      };
      onRegister: {
        callback: () => void;
      };
    }> {}
export default function RegisterForm({
  className,
  actions,
  onRender,
  ...props
}: RegisterFormProps) {
  const form = useForm<RegisterTypeSchema>({
    resolver: zodResolver(registerSchema),
  });
  const { setEmail, setType } = useAuthStore();
  const registerMutation = useMutation({
    mutationFn: async (formData: RegisterDto) => {
      const c = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: "http://localhost:3000/auth/",
      });
      if (c.error) {
        throw c.error;
      }
      setEmail(formData.email);
      setType("email-verification");
      return c;
    },
    onError: (err) => {
      toast.error("Oops...", {
        description: err.message,
      });
    },
    onSuccess: (data) => {
      setTimeout(() => {
        actions?.onRegister.callback();
      }, 500);
    },
  });

  function handleRegisterForm(formData: RegisterDto) {
    registerMutation.mutate(formData);
  } //function to handle with data and submit
  useEffect(() => {
    if (onRender != undefined) {
      onRender();
    }
  }, []);
  return (
    <form
      onSubmit={form.handleSubmit(handleRegisterForm)}
      className="grid gap-2"
      noValidate={true}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Field.Root>
            <Field.Label requiredIcon>Name</Field.Label>
            <Input
              placeholder="Enter your name..."
              invalid={!!form.formState.errors.name?.message}
              {...form.register("name")}
              startElement={<LucideUser size={16} />}
            />
            <Field.ErrorText>
              {form.formState.errors.name?.message}
            </Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label requiredIcon>Email</Field.Label>
            <Input
              placeholder="Enter your email..."
              invalid={!!form.formState.errors.email?.message}
              {...form.register("email")}
              startElement={<LucideMail size={16} />}
            />
            <Field.ErrorText>
              {form.formState.errors.email?.message}
            </Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label requiredIcon>Password</Field.Label>
            <PasswordInput
              invalid={!!form.formState.errors.password?.message}
              {...form.register("password")}
              placeholder="Enter your password..."
            />
            <Field.ErrorText>
              {form.formState.errors.password?.message}
            </Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label requiredIcon>Confirm password</Field.Label>
            <PasswordInput
              invalid={!!form.formState.errors.confirmPassword?.message}
              {...form.register("confirmPassword")}
              placeholder="Confirm your password..."
            />
            <Field.ErrorText>
              {form.formState.errors.confirmPassword?.message}
            </Field.ErrorText>
          </Field.Root>
          <div className="relative">
            <LoadingButton isLoading={registerMutation.isPending}>
              Continue <LucideArrowRight />
            </LoadingButton>
          </div>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a
            onClick={actions?.login.callback}
            className="hover:underline underline-offset-4 cursor-pointer text-primary font-semibold"
          >
            Log-in
          </a>
        </div>
      </div>
    </form>
  );
}
