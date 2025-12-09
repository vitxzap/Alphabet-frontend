import { ReactNode } from "react";

interface FilterProps extends React.ComponentProps<"form"> {
  filterName: string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface SelectFilterProps extends Omit<FilterProps, "title" | "description"> {
  items: Array<{
    title: string;
    icon?: ReactNode;
  }>;
}
interface FilterTriggerButton extends React.ComponentProps<"button"> {
  icon: ReactNode;
  filterName: string;
  filterValue?: string;
}

export type { FilterProps, SelectFilterProps, FilterTriggerButton };
