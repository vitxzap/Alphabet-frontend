export interface AuthCardScreen {
  title: string | "Card Title";
  description: string | "Card Description";
  footerText?: string | "Card Footer text" | undefined;
}

type AuthCards = "login" | "register" | "forgotPassword" | "resetPassword";

export const AuthCardConfig: Readonly<Record<AuthCards, AuthCardScreen>> = {
  login: {
    title: "Welcome back!",
    description: "Enter your credentials to access your account.",
    footerText: "Don't have an account? Create one.",
  },
  register: {
    title: "Nice to meet you!",
    description: "Please, provide your information to create your account.",
    footerText: "Already have an account? Log-in.",
  },
  forgotPassword: {
    title: "Forgot your password?",
    description:
      "Enter your email and we'll send a code to reset your password.",
    footerText: "I remembered my password!",
  },
  resetPassword: {
    title: "Create a new password",
    description:
      "Choose a new secure password to finish resetting your account.",
  },
};
