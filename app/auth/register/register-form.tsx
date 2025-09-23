"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import {
  LucideAlertCircle,
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
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useMutation } from "@tanstack/react-query";
import { LoginDto } from "../login/login-dto";
import { toast } from "sonner";
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

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<RegisterTypeSchema>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (formData: RegisterDto) => {
      const c = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: "http://localhost:3000/auth/login",
      });
      if (c.error) {
        throw c.error;
      }
      return c;
    },
    onError: (err) => {
      toast.error("Error", {
        position: "bottom-center",
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--destructive) 30%, var(--background) 70% )",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
        icon: <LucideCircleX />,
        description: err.message,
      });
    },
    onSuccess: (data) => {
      toast.success("Success", {
        position: "bottom-center",
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--color-green-600) 30%, var(--background) 70%)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
        icon: <LucideUserRoundCheck />,
        description: "Please check your inbox to verify your email.",
      });
    },
  });

  function handleRegisterForm(formData: RegisterDto) {
    registerMutation.mutate(formData);
  } //function to handle with data and submit
  return (
    <div
      className={cn(
        "flex flex-col gap-6 relative w-full items-center justify-center"
      )}
      {...props}
    >
      <Card className="relative min-w-1/4 max-w-1/2">
        <BorderTrail size={100} />
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Nice to meet you!</CardTitle>

          <CardDescription>
            Please, provide your information to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <Button type="submit" className="w-full relative">
                    {registerMutation.isPending ? (
                      <>
                        <Spinner variant="ring" /> Loading...
                      </>
                    ) : (
                      <>
                        Continue <LucideArrowRight />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/login" className="underline underline-offset-4">
                  Log-in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </Card>
    </div>
  );
}
