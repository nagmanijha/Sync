import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import useWorkspaceId from "../../../hooks/use-workspace-id";
import useGetProjectsInWorkspaceQuery from "../../../hooks/api/use-get-projects";
import { Loader, FolderPlus } from "lucide-react";
import { getAvatarColor, getAvatarFallbackText } from "../../../lib/helper";
import { format } from "date-fns";

const RecentProjects = () => {
  const workspaceId = useWorkspaceId();

  const { data, isPending } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageNumber: 1,
    pageSize: 10,
  });

  const projects = data?.projects || [];

  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <Loader
          className="w-8 h-8
         animate-spin
         place-self-center
         flex"
        />
      ) : null}

      {!isPending && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-50 p-3 rounded-full mb-3">
            <FolderPlus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground">No projects yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Projects help you organize tasks and team members. Start one to get rolling!
          </p>
        </div>
      )}

      <ul role="list" className="space-y-2">
        {projects.map((project) => {
          const name = project.createdBy.name;
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);

          return (
            <li
              key={project._id}
              role="listitem"
              className="group shadow-none cursor-pointer border-0 py-2 hover:bg-white hover:shadow-sm rounded-lg px-2 transition-all duration-200 ease-in-out"
            >
              <Link
                to={`/workspace/${workspaceId}/project/${project._id}`}
                className="grid gap-8 p-0"
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl !leading-[1.4rem] bg-slate-50 p-2 rounded-md group-hover:scale-110 transition-transform duration-200">
                    {project.emoji}
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                      {project.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.createdAt
                        ? format(project.createdAt, "PPP")
                        : null}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-4">
                    <Avatar className="hidden h-8 w-8 sm:flex border-2 border-white shadow-sm">
                      <AvatarImage
                        src={project.createdBy.profilePicture || ""}
                        alt="Avatar"
                      />
                      <AvatarFallback className={avatarColor}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentProjects;
