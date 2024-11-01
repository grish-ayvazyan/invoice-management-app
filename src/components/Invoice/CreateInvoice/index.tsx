import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import { InvoiceStatus } from "@/types";
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

export const CreateInvoice: React.FC = () => {
    const { addInvoice, projects, fetchProjects } = useStore();

    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            projectId: "",
            amount: 0,
            date: new Date(),
            status: InvoiceStatus.Pending,
        },
    });

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const onSubmit = (data: FormData) => {
        addInvoice(data);
        form.reset();
    };

    return (
        <Card className="w-1/2 self-start">
            <CardHeader>
                <CardTitle>Create Invoice</CardTitle>
            </CardHeader>
            <CardContent className="h-full  ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col [&>div]:h-24">
                        <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
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
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(InvoiceStatus).map((status) => {
                                                return (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">
                            Create Invoice
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateInvoice;
