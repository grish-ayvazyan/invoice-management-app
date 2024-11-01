import React, { useEffect } from "react";

import EditProject from "@/components/Project/EditProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStore } from "@/store/useStore";
import { format } from "date-fns";

export const ProjectList = () => {
    const { projects, fetchProjects } = useStore();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption> {!projects.length && "No data found"}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>{format(new Date(project.createdAt), "PP")}</TableCell>
                                <TableCell>
                                    <EditProject project={project} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ProjectList;
