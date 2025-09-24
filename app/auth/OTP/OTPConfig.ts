export interface OTPScreen {
 title: string | 'OTP Card Title',
 description: string | 'OTP Card Description'
} //What fields the OTP Card will display

type OTPVariants = 'login' | 'register' | 'forgotPassword'; //defining OTP Card Variants
export type OTPPurpose = "sign-in" | "email-verification" | "forget-password"; // define all OTP methods
export const OTPCardConfig: Readonly<Record<OTPVariants, OTPScreen>> = { //Set what the OTP card's fields will display based on its variant
  login: { 
    title: "Login into your account",
    description:
      "We sent a login code to your email, so you can login, please, check your inbox.",
  },
  register: {
    title: "Verify your account",
    description:
      "Check your email and enter the code to complete registration.",
  },
  forgotPassword:{
    title: "Reset your password",
    description: "We sent a code to your email so you can reset your password, please, check your inbox."
  },
};


