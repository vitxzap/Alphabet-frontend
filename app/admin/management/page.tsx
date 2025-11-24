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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Victor Santos",
      courseName: "Gastronomy",
      email: "victor@email.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "kalel Rodrigues",
      courseName: "Software engineer",
      email: "kalel@email.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Marcelo Cardoso",
      courseName: "Analysis and system development",
      email: "marcelo@email.com",
      createdAt: new Date(),
      updatedAt: new Date(),
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
