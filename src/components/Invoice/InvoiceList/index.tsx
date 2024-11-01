import React, { useEffect, useState } from "react";

import DeleteInvoice from "@/components/Invoice/DeleteInvoice";
import { EditInvoice } from "@/components/Invoice/EditInvoice";
import ScheduleEmail from "@/components/Invoice/ScheduleEmail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStore } from "@/store/useStore";
import { format } from "date-fns";

export const InvoiceList: React.FC = () => {
    const { invoices, projects, fetchInvoices, fetchProjects } = useStore();
    const [filter, setFilter] = useState({ date: undefined as Date | undefined, project: "", search: "" });

    useEffect(() => {
        fetchInvoices();
        fetchProjects();
    }, [fetchInvoices, fetchProjects]);

    const filteredInvoices = invoices.filter((invoice) => {
        const projectName = projects.find((p) => p.id === invoice.projectId)?.name || "";
        return (
            (filter.date ? format(new Date(invoice.date), "yyyy-MM-dd") === format(filter.date, "yyyy-MM-dd") : true) &&
            (filter.project === "all" || (filter.project ? invoice.projectId === filter.project : true)) &&
            (filter.search
                ? projectName.toLowerCase().includes(filter.search.toLowerCase()) ||
                  invoice.id.toLowerCase().includes(filter.search.toLowerCase())
                : true)
        );
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 mb-4">
                    <span className="[&>button]:min-w-56">
                        <DatePicker date={filter.date} setDate={(date) => setFilter({ ...filter, date })} />
                    </span>
                    <Select onValueChange={(value) => setFilter({ ...filter, project: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Projects" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Projects</SelectItem>
                            {projects.map((project) => (
                                <SelectItem key={project.id} value={project.id}>
                                    {project.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        type="text"
                        value={filter.search}
                        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                        placeholder="Search..."
                    />
                </div>
                <Table>
                    <TableCaption> {(!invoices.length || !filteredInvoices.length) && "No data found"}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredInvoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{format(new Date(invoice.date), "PP")}</TableCell>
                                <TableCell>{projects.find((p) => p.id === invoice.projectId)?.name}</TableCell>
                                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                                <TableCell className="flex space-x-2">
                                    <EditInvoice invoice={invoice} />
                                    <DeleteInvoice invoiceId={invoice.id} />
                                    <ScheduleEmail invoiceId={invoice.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default InvoiceList;
