import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/useStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import * as yup from "yup";

const schema = yup
    .object({
        id: yup.string(),
        name: yup.string().required("Project name is required"),
        description: yup.string().required("Project description is required"),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

export const CreateProject: React.FC = () => {
    const { addProject } = useStore();

    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = (data: FormData) => {
        addProject({
            ...data,
            id: nanoid(),
            createdAt: new Date(),
        });
        form.reset();
    };

    return (
        <Card className="w-1/2 self-start">
            <CardHeader>
                <CardTitle>Create Project</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="[&>div]:h-24">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter project name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="!h-32">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter project description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Create Project
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateProject;
