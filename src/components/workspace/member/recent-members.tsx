import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import useGetWorkspaceMembers from "../../../hooks/api/use-get-workspace-members";
import useWorkspaceId from "../../../hooks/use-workspace-id";
import { getAvatarColor, getAvatarFallbackText } from "../../../lib/helper";
import { format } from "date-fns";
import { Loader, UserPlus } from "lucide-react";

const RecentMembers = () => {
  const workspaceId = useWorkspaceId();
  const { data, isPending } = useGetWorkspaceMembers({ workspaceId });

  const members = data?.members || [];

  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <Loader
          className="w-8 h-8 
        animate-spin
        place-self-center flex"
        />
      ) : null}

      {!isPending && members.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-50 p-3 rounded-full mb-3">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground">It's just you</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Work is better together. Invite your team members to collaborate!
          </p>
        </div>
      )}

      <ul role="list" className="space-y-3">
        {members.map((member, index) => {
          const name = member?.userId?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <li
              key={index}
              role="listitem"
              className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:bg-white hover:shadow-sm hover:border-gray-100 transition-all duration-200"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10 sm:flex border-2 border-white shadow-sm">
                  <AvatarImage
                    src={member.userId.profilePicture || ""}
                    alt="Avatar"
                  />
                  <AvatarFallback className={avatarColor}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Member Details */}
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-foreground">
                  {member.userId.name}
                </p>
                <p className="text-xs text-muted-foreground">{member.role.name}</p>
              </div>

              {/* Joined Date */}
              <div className="ml-auto text-xs text-muted-foreground">
                <p>Joined {member.joinedAt ? format(member.joinedAt, "MMM d, yyyy") : null}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentMembers;
