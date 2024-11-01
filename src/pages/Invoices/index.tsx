import React from "react";

import CreateInvoice from "@/components/Invoice/CreateInvoice";
import InvoiceList from "@/components/Invoice/InvoiceList";

export const Invoices: React.FC = () => {
    return (
        <div className="flex w-full space-x-2">
            <CreateInvoice />
            <InvoiceList />
        </div>
    );
};

export default Invoices;
