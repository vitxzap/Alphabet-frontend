import { assign, setup } from "xstate";
import { OTPPurpose } from "./OTP/OTPConfig";

export type authMode =
  | "login"
  | "register"
  | "forgotPassword"
  | "newPassword"
  | { otp: "login" | "register" | "forgotPassword" };
type authEvent =
  | { type: "REQUEST_LOGIN_FORM" }
  | { type: "REQUEST_ERROR_CARD" }
  | { type: "REQUEST_REGISTER_FORM" }
  | { type: "REQUEST_FORGOT_PASSWORD_FORM" }
  | { type: "REQUEST_NEW_PASSWORD_FORM" }
  | { type: "OTP_SUCCESS" }
  | { type: "OTP_FAILED" }
  | { type: "NEW_PASSWORD_CHANGED" }
  | {
      type: "REQUEST_OTP_FORM";
      email: string;
      purpose: OTPPurpose;
    };

interface authContext {
  email?: string;
}

export const AuthMachine = setup({
  types: {
    context: {} as authContext,
    events: {} as authEvent,
  },
}).createMachine({
  id: "auth",
  initial: "login",
  context: {
    email: undefined,
  },
  states: {
    login: {
      on: {
        REQUEST_REGISTER_FORM: "register",
        REQUEST_FORGOT_PASSWORD_FORM: "forgotPassword",
        REQUEST_OTP_FORM: {
          target: "otp.login",
          actions: assign({ email: ({ event }) => event.email }),
        },
      },
    },
    register: {
      on: {
        REQUEST_LOGIN_FORM: "login",
        REQUEST_OTP_FORM: {
          target: "otp.register",
          actions: assign({ email: ({ event }) => event.email }),
        },
      },
    },
    forgotPassword: {
      on: {
        REQUEST_LOGIN_FORM: "login",
        REQUEST_OTP_FORM: {
          target: "otp.forgotPassword",
          actions: assign({ email: ({ event }) => event.email }),
        },
      },
    },
    otp: {
      initial: "login",
      states: {
        login: {
          on: { OTP_SUCCESS: "#auth.dashboard" },
        },
        register: {
          on: { OTP_SUCCESS: "#auth.dashboard" },
        },
        forgotPassword: {
          on: { OTP_SUCCESS: "#auth.resetPassword" },
        },
      },
    },
    errorCard: {
      on: {
        REQUEST_ERROR_CARD: "",
      },
    },
    resetPassword: {
      on: { NEW_PASSWORD_CHANGED: "login" },
    },
    dashboard: {
      type: "final",
    },
  },
});

export interface AuthMachineComponentProps<
  AuthMachineComponentActions extends Record<string, { callback?: () => void }>
> {
  actions?: AuthMachineComponentActions;
  onRender?: () => void;
}
