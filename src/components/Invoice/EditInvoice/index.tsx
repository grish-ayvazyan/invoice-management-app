import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import { IInvoice, InvoiceStatus } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        projectId: yup.string().required("Project is required"),
        amount: yup.number().positive("Amount must be positive").required("Amount is required"),
        date: yup.date().required("Date is required"),
        status: yup.string().oneOf(Object.values(InvoiceStatus)).required("Status is required"),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

type EditInvoiceProps = {
    invoice: IInvoice;
};

export const EditInvoice: React.FC<EditInvoiceProps> = ({ invoice }) => {
    const { projects, updateInvoice } = useStore();
    const [open, setOpen] = React.useState(false);

    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            projectId: invoice.projectId,
            amount: invoice.amount,
            date: new Date(invoice.date),
            status: invoice.status,
        },
    });

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            form.reset();
        }
    };

    const onSubmit = (data: FormData) => {
        updateInvoice({ ...invoice, ...data });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Invoice</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a project" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {projects.map((project) => (
                                                <SelectItem key={project.id} value={project.id}>
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <DatePicker date={field.value} setDate={field.onChange} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(InvoiceStatus).map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Update Invoice</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditInvoice;
