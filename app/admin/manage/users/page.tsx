import {
  PageHeaderDescription,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from "@/components/ui/page-components";
import { DataTable } from "./table/data-table";
import { columns, User } from "./table/columns";
import { data } from "./data";
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
