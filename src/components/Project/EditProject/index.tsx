import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/useStore";
import { IProject } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        name: yup.string().required("Project name is required"),
        description: yup.string().required("Project description is required"),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

type EditProjectProps = {
    project: IProject;
};

const EditProject: React.FC<EditProjectProps> = ({ project }) => {
    const { updateProject } = useStore();
    const [open, setOpen] = React.useState(false);

    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: project.name,
            description: project.description,
        },
    });

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            form.reset();
        }
    };

    const onSubmit = (data: FormData) => {
        updateProject({ ...project, ...data });
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" {...field} onChange={(e) => field.onChange(e.target.value)} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        className="min-h-32"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Update Project</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProject;
