import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { TaskPriorityEnum, TaskStatusEnum } from "../../../constant";
import useWorkspaceId from "../../../hooks/use-workspace-id";
import { getAllTasksQueryFn } from "../../../lib/api";
import {
  getAvatarColor,
  getAvatarFallbackText,
  transformStatusEnum,
} from "../../../lib/helper";
import type { TaskType } from "../../../types/api.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader, ClipboardList } from "lucide-react";

const RecentTasks = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () =>
      getAllTasksQueryFn({
        workspaceId,
      }),
    staleTime: 0,
    enabled: !!workspaceId,
  });

  const tasks: TaskType[] = data?.tasks || [];

  return (
    <div className="flex flex-col space-y-4">
      {isLoading ? (
        <Loader
          className="w-8 h-8 
        animate-spin
        place-self-center flex"
        />
      ) : null}

      {!isLoading && tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-50 p-3 rounded-full mb-3">
            <ClipboardList className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground">No tasks yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Your team is all caught up! Create a new task to keep things moving.
          </p>
        </div>
      )}

      <ul role="list" className="space-y-2">
        {tasks.map((task) => {
          const name = task?.assignedTo?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <li
              key={task._id}
              className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              {/* Task Info */}
              <div className="flex flex-col space-y-1 flex-grow">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground bg-slate-50 px-1.5 py-0.5 rounded">
                    {task.taskCode}
                  </span>
                  <Badge
                    variant={TaskPriorityEnum[task.priority]}
                    className="flex w-auto p-0.5 px-1.5 text-[10px] gap-1 font-medium border-0 opacity-80"
                  >
                    <span>{transformStatusEnum(task.priority)}</span>
                  </Badge>
                </div>

                <p className="text-sm font-semibold text-foreground truncate">
                  {task.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Due: {task.dueDate ? format(task.dueDate, "MMM d") : "No Date"}</span>
                </div>
              </div>

              {/* Task Status */}
              <div className="text-sm font-medium">
                <Badge
                  variant={TaskStatusEnum[task.status]}
                  className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0"
                >
                  <span>{transformStatusEnum(task.status)}</span>
                </Badge>
              </div>

              {/* Assignee */}
              <div className="flex items-center space-x-2 ml-4">
                <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                  <AvatarImage
                    src={task.assignedTo?.profilePicture || ""}
                    alt={task.assignedTo?.name}
                  />
                  <AvatarFallback className={avatarColor}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTasks;
