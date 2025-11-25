import {
  PageHeaderDescription,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from "@/components/ui/page-components";
import { DataTable } from "./table/data-table";
import { columns, User } from "./table/columns";

export default async function UserManagement() {
  const data: User[] = [
    {
      name: "Jonh Doe",
      courseName: "Analysis and system development",
      email: "jonhdoe@email.com",
      emailVerified: false
    },
    {
      name: "Victor Santos",
      courseName: "Gastronomy",
      email: "victor@email.com",
      emailVerified: true
    },
    {
      name: "kalel Rodrigues",
      courseName: "Software engineer",
      email: "kalel@email.com",
      emailVerified: true
    },
    {
      name: "Marcelo Cardoso",
      courseName: "Analysis and system development",
      email: "marcelo@email.com",
      emailVerified: false
    },
  ];
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
