import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronsUpDown, Loader, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "../../components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import Logo from "../../components/logo";
import LogoutDialog from "./logout-dialog";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { Separator } from "../ui/separator";
import useWorkspaceId from "../../hooks/use-workspace-id";
import { useAuthContext } from "../../context/auth-provider";

const Asidebar = () => {
  const { isLoading, user } = useAuthContext();

  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader className="!py-0">
          <div className="flex h-[50px] items-center justify-start w-full px-1">
            <Logo />
            {open && (
              <Link
                to={`/workspace/${workspaceId}`}
                className="hidden md:flex ml-2 items-center gap-2 self-center font-medium"
              >
                Sync.
              </Link>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className=" !mt-0">
          <SidebarGroup className="!py-0">
            <SidebarGroupContent>
              <WorkspaceSwitcher />
              <Separator />
              <NavMain />
              <Separator />
              <NavProjects />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              {isLoading ? (
                <Loader
                  size="24px"
                  className="place-self-center self-center animate-spin"
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all duration-200 ease-in-out hover:bg-sidebar-accent/50 group-data-[collapsible=icon]:!p-0"
                    >
                      <Avatar className="h-8 w-8 rounded-lg border border-sidebar-border transition-transform hover:scale-105 shadow-sm">
                        <AvatarImage src={user?.profilePicture || ""} />
                        <AvatarFallback className="rounded-lg bg-sidebar-primary/10 text-sidebar-primary font-semibold">
                          {user?.name?.split(" ")?.[0]?.charAt(0)}
                          {user?.name?.split(" ")?.[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight gap-0.5 ml-1">
                        <span className="truncate font-semibold text-foreground">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg border-sidebar-border"
                    side={"bottom"}
                    align="start"
                    sideOffset={8}
                  >
                    <div className="flex items-center gap-2 p-2 px-3 border-b border-sidebar-border mb-1">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user?.profilePicture || ""} />
                        <AvatarFallback className="rounded-lg bg-sidebar-primary/10 text-sidebar-primary font-semibold">
                          {user?.name?.split(" ")?.[0]?.charAt(0)}
                          {user?.name?.split(" ")?.[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-0.5 leading-none">
                        <p className="font-semibold text-sm">{user?.name}</p>
                        <p className="w-[180px] truncate text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuGroup>
                      {/* Add more items if needed */}
                    </DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => setIsOpen(true)}
                      className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer m-1"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Asidebar;
