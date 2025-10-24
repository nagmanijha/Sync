import useGetWorkspaceMembers from "../../../hooks/api/use-get-workspace-members";
import useWorkspaceId from "../../../hooks/use-workspace-id";
import { Loader } from "lucide-react";

interface RemoveMemberProps {
  memberId?: string;
  onRemove: (id: string) => void;
  currentUserRole: string;
}

const RemoveMember = ({ memberId, onRemove, currentUserRole }: RemoveMemberProps) => {
  const workspaceId = useWorkspaceId();
  const { data, isPending } = useGetWorkspaceMembers(workspaceId);
  const members = data?.members || [];

  // Handle remove button click
  const handleRemove = (memberIdToRemove: string) => {
    onRemove(memberIdToRemove);
  };

  if (isPending) return <Loader />;

  // If memberId is provided, only show that specific member
  const membersToShow = memberId 
    ? members.filter(member => member.userId._id === memberId)
    : members;

  return (
    <div className="flex flex-col pt-2">
      <ul role="list" className="space-y-3">
        {membersToShow.map((member) => {
          const canRemove = 
            // Only OWNER and ADMIN can remove members
            (currentUserRole === "OWNER" || currentUserRole === "ADMIN") &&
            // Cannot remove OWNER role
            member.role.name !== "OWNER" &&
            // Optional: prevent users from removing themselves
            // You might want to add this check if you have current user info
            // member.userId._id !== currentUserId
            true;

          if (!canRemove) return null;

          return (
            <li key={member._id} className="flex justify-end">
              <button
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 hover:border-red-300 rounded-md transition-colors"
                onClick={() => handleRemove(member._id)}
                type="button"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RemoveMember;