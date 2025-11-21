import React from "react";

function PageHeader({ ...props }: React.ComponentProps<"div">) {
  return <div className="flex flex-col gap-1 mb-5" {...props}></div>;
}

function PageHeaderTitle({ ...props }: React.ComponentProps<"h1">) {
  return <h1 className="text-xl font-semibold" {...props} />;
}

function PageHeaderDescription({ ...props }: React.ComponentProps<"span">) {
  return <span className="text-muted-fg text-sm" {...props} />;
}

function PageContent({ ...props }: React.ComponentProps<"div">) {
  return (
    <div className="flex w-full h-full" {...props} />
  );
}
export { PageHeader, PageHeaderDescription, PageHeaderTitle, PageContent };
