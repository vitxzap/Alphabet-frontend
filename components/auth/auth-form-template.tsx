import { ComponentProps } from "react";
import { AnimatePresence, motion } from "motion/react";
function AuthForm({ children, onSubmit, name }: ComponentProps<"form">) {
  return (
    <motion.form
      className="flex flex-col items-center justify-center w-full"
      onSubmit={onSubmit}
      noValidate
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={name}
          className="flex flex-col gap-4 items-center justify-center w-11/12 xl:w-1/4"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.form>
  );
}

function AuthFormContent({ ...props }: ComponentProps<"div">) {
  return <div className="flex flex-col gap-4 w-full" {...props} />;
}
function AuthFormContentInputs({ ...props }: ComponentProps<"div">) {
  return <div className="flex flex-col w-full gap-3" {...props} />;
}
export { AuthForm, AuthFormContent, AuthFormContentInputs };
