import { Plus } from "lucide-react";

import { Button } from "../../components/ui/button";
import useCreateProjectDialog from "../../hooks/use-create-project-dialog";
import WorkspaceAnalytics from "../../components/workspace/workspace-analytics";
import ActivityLog from "../../components/workspace/activity-log";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import RecentProjects from "../../components/workspace/project/recent-projects";
import RecentTasks from "../../components/workspace/task/recent-tasks";
import RecentMembers from "../../components/workspace/member/recent-members";
import { useAuthContext } from "../../context/auth-provider";

const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog();
  const { user } = useAuthContext();

  return (
    <main className="flex flex-1 flex-col py-6 md:pt-4 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Hello, {user?.name?.split(" ")[0]} 👋
          </h2>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening in your workspace today.
          </p>
        </div>
        <Button onClick={onOpen} className="shadow-lg shadow-primary/20 transition-transform active:scale-95">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 space-y-6">
          <WorkspaceAnalytics />
        </div>
        <div className="xl:col-span-1">
          <ActivityLog />
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="projects" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="projects" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-950">Recent Projects</TabsTrigger>
              <TabsTrigger value="tasks" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-950">Recent Tasks</TabsTrigger>
              <TabsTrigger value="members" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-950">Recent Members</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="projects" className="mt-0">
            <RecentProjects />
          </TabsContent>
          <TabsContent value="tasks" className="mt-0">
            <RecentTasks />
          </TabsContent>
          <TabsContent value="members" className="mt-0">
            <RecentMembers />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default WorkspaceDashboard;
