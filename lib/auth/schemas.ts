import z from "zod";
export const forgotPasswordSchema = z.object({
  email: z
    .email({ error: "Invalid: must be an email" })
    .nonempty({ error: "Invalid: must not by empty" }),
});

export const loginSchema = z.object({
  email: z
    .email({ error: "Invalid: must be an email" })
    .nonempty({ error: "Invalid: must not by empty" }),
  password: z
    .string({ error: "Invalid: must not by empty" })
    .nonempty({ error: "Invalid: must not by empty" }),
  rememberMe: z.boolean(),
});

export const otpFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your verification code must be 6 digits",
  }),
});

export const registerSchema = z
  .object({
    name: z.string({ error: "Invalid: must not be empty" }).min(3),
    email: z.email({ error: "Invalid: must be an email" }).nonempty(),
    password: z.string({ error: "Invalid: must not be empty" }).min(8),
    confirmPassword: z.string({ error: "Invalid: must not be empty" }).min(8),
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
  newPassword: z.string({ error: "Invalid: must not be empty" }).min(8),
});
