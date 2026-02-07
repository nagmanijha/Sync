import { format } from "date-fns";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useWorkspaceId from "../../hooks/use-workspace-id";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceAuditLogsQueryFn } from "../../lib/api";
import { getAvatarColor, getAvatarFallbackText } from "../../lib/helper";

import type { AuditLogType } from "../../types/api.type";

const ActivityLog = () => {
    const workspaceId = useWorkspaceId();

    const { data, isPending } = useQuery({
        queryKey: ["workspace-logs", workspaceId],
        queryFn: () => getWorkspaceAuditLogsQueryFn(workspaceId),
        staleTime: 0,
        enabled: !!workspaceId,
    });

    const logs: AuditLogType[] = data?.logs || [];

    return (
        <Card className="col-span-1 lg:col-span-2 xl:col-span-1 flex flex-col h-full shadow-none">
            <CardHeader className="p-4 border-b">
                <CardTitle className="text-base font-semibold">Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
                <ScrollArea className="h-[350px] w-full p-4">
                    {isPending ? (
                        <div className="flex h-full items-center justify-center">
                            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="text-center text-sm text-muted-foreground py-4">
                            No recent activity.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {logs.map((log) => (
                                <div key={log._id} className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={log.actorId.profilePicture || ""} />
                                        <AvatarFallback className={getAvatarColor(log.actorId.name)}>
                                            {getAvatarFallbackText(log.actorId.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-sm font-medium leading-none">
                                            <span className="font-semibold text-primary">
                                                {log.actorId.name}
                                            </span>{" "}
                                            <span className="text-muted-foreground font-normal">
                                                {log.action.replace("CREATED_", "Created ").replace("DELETED_", "Deleted ").replace("CHANGED_", "Changed ").replace("REMOVED_", "Removed ").toLowerCase()}
                                            </span>{" "}
                                            <span className="font-medium">{log.entityType}</span>
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                            {format(new Date(log.createdAt), "MMM d, h:mm a")}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default ActivityLog;
