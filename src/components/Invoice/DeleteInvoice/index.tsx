import React from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "@/store/useStore";

type DeleteInvoiceProps = {
    invoiceId: string;
};

export const DeleteInvoice: React.FC<DeleteInvoiceProps> = ({ invoiceId }) => {
    const { deleteInvoice } = useStore();

    const [open, setOpen] = React.useState(false);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
    };

    const handleAccept = () => {
        deleteInvoice(invoiceId);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Invoice</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this invoice?</DialogDescription>
                </DialogHeader>
                <div className="flex ml-auto space-x-2">
                    <Button onClick={handleAccept} variant="secondary" className="bg-emerald-950">
                        Accept
                    </Button>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Decline
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteInvoice;
