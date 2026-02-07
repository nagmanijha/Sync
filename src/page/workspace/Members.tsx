import { Separator } from "../../components/ui/separator";
import InviteDialog from "../../components/workspace/member/invite-dialog";
import MembersTable from "../../components/workspace/member/members-table";
import WorkspaceHeader from "../../components/workspace/common/workspace-header";
// import RemoveMember from "../../components/workspace/member/remove-member";

export default function Members() {
  return (
    <div className="w-full h-auto pt-2">
      <WorkspaceHeader />
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-5xl mx-auto pt-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Members</h2>
              <p className="text-muted-foreground">
                Manage who has access to this workspace.
              </p>
            </div>
            <InviteDialog />
          </div>

          <MembersTable />
        </div>
      </main>
    </div>
  );
}
