import { ComponentProps } from "react";
import { AnimatePresence, motion } from "motion/react";
function AuthForm({ children, onSubmit, name }: ComponentProps<"form">) {
  return (
    <motion.form
      className="grid gap-2 min-w-[25%]"
      onSubmit={onSubmit}
      noValidate
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={name} // ou use uma key específica que muda com o conteúdo
          className="grid gap-4"
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
  return <div className="flex flex-col gap-4 max-w-full" {...props} />;
}
function AuthFormContentInputs({ ...props }: ComponentProps<"div">) {
  return <div className="flex flex-col w-full gap-3" {...props} />;
}
export { AuthForm, AuthFormContent, AuthFormContentInputs };
