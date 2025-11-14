import z from "zod";

const emailErrorMessage: string = "Invalid: must be an email";
const emptyErrorMessage: string = "Invalid: must not by empty";
export const forgotPasswordSchema = z.object({
  email: z
    .email({ error: emailErrorMessage })
    .nonempty({ error: emptyErrorMessage }),
});

export const loginSchema = z.object({
  email: z
    .email({ error: emailErrorMessage })
    .nonempty({ error: emptyErrorMessage }),
  password: z
    .string({ error: emptyErrorMessage })
    .nonempty({ error: emptyErrorMessage }),
  rememberMe: z.boolean(),
});

export const otpFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your verification code must be 6 digits",
  }),
});

export const registerSchema = z
  .object({
    name: z.string({ error: emptyErrorMessage }).min(3),
    email: z.email({ error: emptyErrorMessage }).nonempty(),
    password: z.string({ error: emptyErrorMessage }).min(8),
    confirmPassword: z.string({ error: emptyErrorMessage }).min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Invalid: passwords do not match",
    path: ["confirmPassword"],
    when(payload) {
      return registerSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });

export const resetPasswordSchema = z.object({
  newPassword: z.string({ error: emptyErrorMessage }).min(8),
});
