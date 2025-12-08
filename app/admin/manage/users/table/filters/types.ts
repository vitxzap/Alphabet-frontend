import { ReactNode } from "react";

interface FilterProps extends React.ComponentProps<"form"> {
  filterName: string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface SelectFilterProps extends FilterProps {
  /**
   * Define all select items.
   * @param {string} title - the item's string that will be shown
   * @param {string} icon - the item's icon.
   */
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
