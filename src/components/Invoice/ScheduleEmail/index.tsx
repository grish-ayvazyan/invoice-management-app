import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/useStore";
import { EmailFrequency, IScheduledEmail } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        recipientEmail: yup.string().email("Invalid email format").required("Recipient email is required"),
        subject: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
        frequency: yup.mixed<EmailFrequency>().oneOf(Object.values(EmailFrequency)).required("Frequency is required"),
        nextSendDate: yup.date().when("frequency", {
            is: "Custom",
            then: (schema) => schema.required("Next send date is required for custom frequency"),
            otherwise: (schema) => schema.notRequired(),
        }),
    })
    .required();

type ScheduleEmailFormValues = yup.InferType<typeof schema>;

type ScheduleEmailProps = {
    invoiceId: string;
};

export const ScheduleEmail: React.FC<ScheduleEmailProps> = ({ invoiceId }) => {
    const { scheduleEmail } = useStore();
    const [open, setOpen] = React.useState(false);

    const form = useForm<ScheduleEmailFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            frequency: EmailFrequency.Monthly,
        },
    });

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            form.reset();
        }
    };

    const onSubmit = (data: ScheduleEmailFormValues) => {
        const emailSettings: IScheduledEmail = {
            ...data,
            nextSendDate: data.nextSendDate ? new Date(data.nextSendDate) : undefined,
        };
        scheduleEmail(invoiceId, emailSettings);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Schedule Email</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Schedule Email</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Schedule Email</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="recipientEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Recipient Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="body"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Body</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="frequency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Frequency</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select frequency" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(EmailFrequency).map((freq) => (
                                                        <SelectItem key={freq} value={freq}>
                                                            {freq}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch("frequency") === EmailFrequency.Custom && (
                                    <FormField
                                        control={form.control}
                                        name="nextSendDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date</FormLabel>
                                                <DatePicker date={field.value} setDate={field.onChange} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" onClick={() => setOpen(false)} variant="outline">
                                        Cancel
                                    </Button>
                                    <Button type="submit">Schedule</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleEmail;
