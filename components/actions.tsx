import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "./ui/dropdown-menu";
import { Link2 , Trash2} from "lucide-react";
import { toast } from "sonner";
import { useAPiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirmModal";
import { Button } from "./ui/button";
interface ActionsProps {
    children: React.ReactNode;
    title: string;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
}

const Actions = ({ children, title, side, sideOffset, id }: ActionsProps) => {

    const {mutate,pending}=useAPiMutation(api.canvas.remove);

    const CopyLink=()=>{
        navigator.clipboard.writeText(`${window.location.origin}/canvas/${id}`).then(()=>{
            toast.success("Link copied")
        })
    }
    
    const DeleteCanvas=()=>{

        mutate({id}).then(()=>{
            toast.success("Canvas Deleted")
        }).catch((err)=>{
            toast.error("Cant delete canvas right now")
        });

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => { e.stopPropagation() }}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem className="p-2 cursor-pointer" onClick={CopyLink}>
                    <Link2 className="h-4 w-4 mr-2" /> Copy link
                </DropdownMenuItem>

                
                <ConfirmModal title="Delete Canvas?" disription="This will delete the canvas and all its content" disabled={pending} onConfirm={DeleteCanvas}>
                <Button variant="ghost" className="p-2 cursor-pointer flex w-full justify-start" >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
                </ConfirmModal>

                <ConfirmModal title="Rename Canvas?" disription="This Rename" disabled={pending} onConfirm={DeleteCanvas}>
                <Button variant="ghost" className="p-2 cursor-pointer flex w-full justify-start" >
                    <Trash2 className="h-4 w-4 mr-2" />Rename
                </Button>
                </ConfirmModal>

                
                




             
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Actions;