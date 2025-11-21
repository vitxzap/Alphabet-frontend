import {
  PageHeaderDescription,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from "@/components/ui/page-components";
import { DataTable } from "./table/data-table";
import { columns, Payment } from "./table/columns";
const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];
export default async function UserManagement() {
  return (
    <div className="flex w-full h-full flex-col">
      <PageHeader>
        <PageHeaderTitle>User management</PageHeaderTitle>
        <PageHeaderDescription>
          Manage your users and their accounts.
        </PageHeaderDescription>
      </PageHeader>
      <PageContent>
        <DataTable columns={columns} data={data} />
      </PageContent>
    </div>
  );
}
