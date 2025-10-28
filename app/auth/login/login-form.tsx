"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { BsMicrosoft } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowRight, LucideMail } from "lucide-react";
import { Field } from "@/components/Field";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { LoginDto } from "./login-dto";
import { authClient } from "@/lib/auth-client";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { AuthMachineComponentProps } from "../auth-machine";
import { useAuthStore } from "../auth-global-state";
import LoadingButton from "../components/loading-button";
import { useRouter } from "next/navigation";
const loginSchema = z.object({
  email: z.email({ error: "Invalid: must be an email" }).nonempty(),
  password: z.string(),
  rememberMe: z.boolean(),
}); //creating zod login schema to be used in the form

type LoginTypeSchema = z.infer<typeof loginSchema>; //Defining zod type to use within typescript
interface LoginFormProps
  extends React.ComponentProps<"div">,
    AuthMachineComponentProps<{
      registerAction: {
        callback: () => void;
      };
      emailVerificationAction: {
        callback: () => void;
      };
      forgotPasswordAction: {
        callback: () => void;
      };
    }> {}
export default function LoginForm({
  className,
  actions,
  onRender,
  ...props
}: LoginFormProps) {
  const form = useForm<LoginTypeSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: true,
    },
  });
  const { setEmail, setType } = useAuthStore();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: async (formData: LoginDto) => {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
      switch (true) {
        case error?.code == "EMAIL_NOT_VERIFIED":
          setEmail(formData.email);
          setType("email-verification");
          actions?.emailVerificationAction.callback();
        case error?.code != undefined:
          throw error;
      }
      return data;
    },
    onError: (err) => {
      toast.error("Oops...", {
        description: err.message,
        position: "top-center",
      });
    },
    onSuccess: () => {
      router.push("/web/classes");
    },
  });

  //Handle with data and submit from forms
  function handleLoginForm(formData: LoginDto) {
    loginMutation.mutate(formData);
  }
  useEffect(() => {
    if (onRender != undefined) {
      onRender();
    }
  }, []);
  return (
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
              startElement={<LucideMail size={18} />}
            />
            <Field.ErrorText>
              {form.formState.errors.email?.message}
            </Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label
              requiredIcon
              onClick={actions?.forgotPasswordAction.callback}
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
            <LoadingButton isLoading={loginMutation.isPending}>
              Continue <LucideArrowRight />
            </LoadingButton>
          </div>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <a
            onClick={actions?.registerAction.callback}
            className="hover:underline underline-offset-4 cursor-pointer text-primary font-semibold"
          >
            Sign up
          </a>
        </div>
      </div>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={async () => {
            const { data, error } = await authClient.signIn.social({
              provider: "microsoft",
              callbackURL: "http://localhost:3000/web/classes",
            });
          }}
          disabled={loginMutation.isPending}
        >
          <BsMicrosoft />
          Login with Microsoft
        </Button>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={async () => {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "http://localhost:3000/web/classes",
            });
          }}
          disabled={loginMutation.isPending}
        >
          <FaGoogle />
          Login with Google
        </Button>
      </div>
    </form>
  );
}
