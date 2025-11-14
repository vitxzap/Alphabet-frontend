import z from "zod";
import { forgotPasswordSchema, loginSchema, otpFormSchema, registerSchema, resetPasswordSchema } from "./schemas";

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type RegisterTypeSchema = z.infer<typeof registerSchema>; 
export type OTPFormSchemaType = z.infer<typeof otpFormSchema>;
export type LoginTypeSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;