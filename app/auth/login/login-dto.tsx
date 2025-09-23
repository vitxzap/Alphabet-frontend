export type LoginDto = {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackURL?: string;
};
