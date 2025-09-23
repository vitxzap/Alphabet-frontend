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
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import {
  LucideArrowRight,
  LucideCircle,
  LucideCircleX,
  LucideMail,
  LucideUserRoundCheck,
} from "lucide-react";
import { Field } from "@/components/Field";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { LoginDto } from "./login-dto";
import { authClient } from "@/lib/auth-client";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const loginSchema = z.object({
  email: z.email({ error: "Invalid: must be an email" }).nonempty(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
}); //creating zod login schema to be used in the form

type LoginTypeSchema = z.infer<typeof loginSchema>; //Defining zod type to use within typescript

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<LoginTypeSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: true,
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (formData: LoginDto) => {
      const response = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        callbackURL: "http://localhost:3050/api/auth/reference",
      });
      if (response.error) {
        throw response.error;
      }
      return response;
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
        description: "Logged in.",
      });
    },
  });

  async function handleLoginForm(formData: LoginDto) {
    loginMutation.mutate(formData);
  } //Handle with data and submit from forms
  return (
    <div
      className={cn(
        "flex flex-col gap-6 relative w-full items-center justify-center"
      )}
      {...props}
    >
      <Card className="relative min-w-1/4">
        <BorderTrail size={100} />
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Provide your information to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleLoginForm)}
            className="grid gap-2"
            noValidate={true}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Field.Root>
                  <Field.Label requiredIcon>Email</Field.Label>
                  <Input
                    required
                    invalid={!!form.formState.errors.email?.message}
                    {...form.register("email")}
                    placeholder="Enter your email..."
                    startElement={<LucideMail size={16} />}
                  />
                  <Field.ErrorText>
                    {form.formState.errors.email?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    requiredIcon
                    additionalInfo="Forgot your password?"
                  >
                    Password
                  </Field.Label>
                  <PasswordInput
                    required
                    invalid={!!form.formState.errors.password?.message}
                    {...form.register("password")}
                    placeholder="Enter your password..."
                  />
                  <Field.ErrorText>
                    {form.formState.errors.password?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label>Remember me?</Label>
                    </div>
                  )}
                ></Controller>

                <div className="relative">
                  <Button
                    type="submit"
                    disabled={form.formState.isLoading}
                    className="w-full relative"
                  >
                    {loginMutation.isPending ? (
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
                Don&apos;t have an account?{" "}
                <a
                  href="/auth/register"
                  className="underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </div>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className=" text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Login with Apple
              </Button>
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
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
