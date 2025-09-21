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
import { useMutation } from "@tanstack/react-query";
import { callRegisterEndpoint } from "@/app/auth/auth-api";
import { RegisterDto } from "@/app/auth/auth-dto";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { LucideArrowRight, LucideUser } from "lucide-react";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { Field } from "@/components/Field";
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
  const register = useMutation({
    mutationFn: callRegisterEndpoint,
    onError: (err) => {},
    onSuccess: () => {},
  });

  function handleRegisterForm(form: RegisterTypeSchema | RegisterDto) {
    register.mutate(form as RegisterDto);
  } //function to handle with data and submit
  return (
    <div className={cn("flex flex-col gap-6 relative", className)} {...props}>
      <Card className="relative">
        <BorderTrail
          className="bg-linear-to-l from-[#6769ff] to-[#696bfd]"
          style={{
            boxShadow:
              "0px 0px 60px 30px #6366f1, 0 0 100px 60px #6366f1, 0 0 140px 90px #6366f1",
          }}
          size={100}
        />
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
              <div className="grid gap-3">
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
                    startElement={<LucideUser size={16} />}
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
                    Register <LucideArrowRight />{" "}
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
