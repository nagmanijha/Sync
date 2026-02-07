import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { getAvatarColor, getAvatarFallbackText } from "../../../lib/helper";
import { format } from "date-fns";
import { ChevronDown, Loader, MoreHorizontal, Search } from "lucide-react";
import { useGetWorkspaceMembers } from "../../../hooks/api/use-get-workspace-members";
import useWorkspaceId from "../../../hooks/use-workspace-id";
import { useAuthContext } from "../../../context/auth-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeWorkspaceMemberRoleMutationFn, removeMemberFromWorkspaceMutationFn } from "../../../lib/api";
import { toast } from "../../../hooks/use-toast";
import { Permissions } from "../../../constant";

// Define the Member type based on API response
// Adjust as needed based on actual API response structure
type Member = {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
        profilePicture?: string;
    };
    role: {
        _id: string;
        name: string;
    };
    joinedAt: string;
};

const RowActions = ({ row }: { row: { original: Member } }) => {
    const workspaceId = useWorkspaceId();
    const { user, hasPermission } = useAuthContext();
    const queryClient = useQueryClient();
    const canChangeMemberRole = hasPermission(Permissions.CHANGE_MEMBER_ROLE);
    const canRemoveMember = hasPermission(Permissions.REMOVE_MEMBER);

    const member = row.original;
    const isSelf = member.userId._id === user?._id;
    const isOwner = member.role.name === "OWNER";

    const { mutate: changeRole } = useMutation({
        mutationFn: changeWorkspaceMemberRoleMutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members", workspaceId] });
            toast({ title: "Success", description: "Role updated successfully", variant: "success" });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    });

    const { mutate: removeMember } = useMutation({
        mutationFn: removeMemberFromWorkspaceMutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members", workspaceId] });
            toast({ title: "Success", description: "Member removed successfully", variant: "success" });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {canChangeMemberRole && !isSelf && !isOwner && (
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <div className="w-full">
                            <p className="mb-1 text-xs text-muted-foreground">Change Role</p>
                            <div className="flex flex-col gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start h-6 px-1 text-xs font-normal"
                                    onClick={() => changeRole({ workspaceId, data: { memberId: member.userId._id, roleId: "67986927956627672205560c" } })} // TODO: Need to fetch roles dynamically.
                                >
                                    Admin
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start h-6 px-1 text-xs font-normal"
                                    onClick={() => changeRole({ workspaceId, data: { memberId: member.userId._id, roleId: "67986927956627672205560d" } })} // TODO: Fix hardcoded IDs
                                >
                                    Member
                                </Button>
                            </div>
                        </div>
                    </DropdownMenuItem>
                )}
                {canChangeMemberRole && !isSelf && !isOwner && <div className="h-px bg-muted my-1" />}

                {canRemoveMember && !isSelf && !isOwner && (
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                        onClick={() => {
                            const confirm = window.confirm("Are you sure you want to remove this member?");
                            if (confirm) removeMember({ workspaceId, memberId: member.userId._id });
                        }}
                    >
                        Remove Member
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: "userId.name",
        header: "Member",
        cell: ({ row }) => {
            const name = row.original.userId.name;
            const email = row.original.userId.email;
            const avatarUrl = row.original.userId.profilePicture;
            const initials = getAvatarFallbackText(name);
            const avatarColor = getAvatarColor(name);

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{name}</span>
                        <span className="text-xs text-muted-foreground">{email}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "role.name",
        header: "Role",
        cell: ({ row }) => {
            const roleName = row.original.role.name;
            const isOwner = roleName === "OWNER";
            return (
                <Badge variant={isOwner ? "default" : "secondary"}>{roleName}</Badge>
            );
        },
    },
    {
        accessorKey: "joinedAt",
        header: "Joined",
        cell: ({ row }) => {
            const date = row.original.joinedAt;
            return (
                <span className="text-sm text-muted-foreground">
                    {date ? format(new Date(date), "PP") : "-"}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <RowActions row={row} />,
    },
];

export default function MembersTable() {
    const workspaceId = useWorkspaceId();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [keyword, setKeyword] = useState("");

    const { data, isLoading } = useGetWorkspaceMembers({
        workspaceId,
        pageSize,
        pageNumber,
        keyword,
    });

    const members = (data?.members as unknown as Member[]) || [];
    const totalPages = data?.pagination?.totalPages || 1;

    const table = useReactTable({
        data: members,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: totalPages,
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        setPageNumber(1); // Reset to first page on search
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search members..."
                        value={keyword}
                        onChange={handleSearch}
                        className="pl-8 h-9"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9">
                        Filter <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="h-10 text-xs uppercase font-medium text-muted-foreground">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <Loader className="ml-auto mr-auto animate-spin" />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="h-12"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No members found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPageNumber((old) => Math.max(old - 1, 1))}
                    disabled={pageNumber === 1}
                >
                    Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                    Page {pageNumber} of {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPageNumber((old) => Math.min(old + 1, totalPages))}
                    disabled={pageNumber === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
