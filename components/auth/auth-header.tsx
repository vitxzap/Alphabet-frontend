import { ComponentProps } from "react";
import { Logo } from "../ui/logo";

function AuthHeader({ children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className="flex flex-col gap-2 items-center justify-center w-full"
      {...props}
    >
      <div className="flex items-center justify-center flex-col gap-6">
        <Logo height={48} width={48} />
      </div>
      {children}
    </div>
  );
}

function AuthHeaderTitle({ ...props }: ComponentProps<"h1">) {
  return <h1 className="font-bold text-2xl" {...props} />;
}

function AuthHeaderDescription({ ...props }: ComponentProps<"div">) {
  return (
    <div
      className="text-center text-sm text-muted-foreground max-w-[80%]"
      {...props}
    />
  );
}

function AuthHeaderLink({ ...props }: ComponentProps<"a">) {
  return (
    <a
      className="hover:underline underline-offset-4 cursor-pointer text-primary-subtle-fg font-semibold"
      {...props}
    />
  );
}

function AuthHeaderDivider({ children, ...props }: ComponentProps<"div">) {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <div className="flex w-full h-max border-t border-fg-muted" />
      <span className="min-w-max text-muted-fg text-sm">{children}</span>
      <div className="flex w-full h-max border-t border-fg-muted" />
    </div>
  );
}

export {
  AuthHeader,
  AuthHeaderTitle,
  AuthHeaderDescription,
  AuthHeaderLink,
  AuthHeaderDivider,
};
