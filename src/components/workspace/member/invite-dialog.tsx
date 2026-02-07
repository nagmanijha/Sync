import { useState } from "react";
import { Copy, Check, Loader, Link } from "lucide-react";
import { Button } from "../../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useAuthContext } from "../../../context/auth-provider";
import { BASE_ROUTE } from "../../../routes/common/routePaths";
import { toast } from "../../../hooks/use-toast";
import PermissionsGuard from "../../resuable/permission-guard";
import { Permissions } from "../../../constant";

export default function InviteDialog() {
    const { workspace, workspaceLoading } = useAuthContext();
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const inviteUrl = workspace
        ? `${window.location.origin}${BASE_ROUTE.INVITE_URL.replace(
            ":inviteCode",
            workspace.inviteCode
        )}`
        : "";

    const handleCopy = () => {
        if (inviteUrl) {
            navigator.clipboard.writeText(inviteUrl).then(() => {
                setCopied(true);
                toast({
                    title: "Copied!",
                    description: "Invite link copied to clipboard.",
                    variant: "success",
                });
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <PermissionsGuard requiredPermission={Permissions.ADD_MEMBER}>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <Link className="mr-2 h-4 w-4" />
                        Invite Member
                    </Button>
                </DialogTrigger>
            </PermissionsGuard>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Invite members</DialogTitle>
                    <DialogDescription>
                        Anyone with this link can join <strong>{workspace?.name}</strong>.
                    </DialogDescription>
                </DialogHeader>

                {workspaceLoading ? (
                    <div className="flex justify-center py-4">
                        <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 pt-4">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue={inviteUrl}
                                readOnly
                                className="h-9"
                            />
                        </div>
                        <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
                            <span className="sr-only">Copy</span>
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
