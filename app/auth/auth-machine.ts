import { setup } from "xstate";
type authEvent =
  | { type: "REQUEST_LOGIN_FORM" }
  | { type: "REQUEST_ERROR_CARD" }
  | { type: "REQUEST_EMAIL_VERIFICATION_OTP" }
  | { type: "USER_AUTHENTICATED" }
  | { type: "REQUEST_REGISTER_FORM" }
  | { type: "REQUEST_FORGOT_PASSWORD_FORM" }
  | { type: "OTP_SUCCESS" }
  | { type: "OTP_MISS_CLICKED" }
  | { type: "NEW_PASSWORD_CHANGED" }
  | {
      type: "REQUEST_OTP_FORM";
    };

export const AuthMachine = setup({
  types: {
    events: {} as authEvent,
  },
}).createMachine({
  id: "auth",
  initial: "login",
  states: {
    login: {
      on: {
        REQUEST_REGISTER_FORM: "register",
        REQUEST_FORGOT_PASSWORD_FORM: "forgotPassword",
        USER_AUTHENTICATED: "dashboard",
        REQUEST_EMAIL_VERIFICATION_OTP: {
          target: "otp.register",
        },
        REQUEST_OTP_FORM: {
          target: "otp.login",
        },
      },
    },
    register: {
      on: {
        REQUEST_LOGIN_FORM: "login",
        REQUEST_OTP_FORM: {
          target: "otp.register",
        },
      },
    },
    forgotPassword: {
      on: {
        REQUEST_LOGIN_FORM: "login",
        REQUEST_OTP_FORM: {
          target: "otp.forgotPassword",
        },
      },
    },
    otp: {
      initial: "login",
      states: {
        login: {
          on: {
            OTP_SUCCESS: "#auth.dashboard",
            OTP_MISS_CLICKED: "#auth.login",
          },
        },
        register: {
          on: {
            OTP_SUCCESS: "#auth.dashboard",
            OTP_MISS_CLICKED: "#auth.login",
          },
        },
        forgotPassword: {
          on: {
            OTP_SUCCESS: "#auth.resetPassword",
            OTP_MISS_CLICKED: "#auth.forgotPassword",
          },
        },
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
