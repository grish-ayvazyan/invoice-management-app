import { IInvoice, IProject, IScheduledEmail } from "src/types";
import { create } from "zustand";

const API_URL = "http://localhost:3001";

type AppState = {
    projects: IProject[];
    invoices: IInvoice[];
    fetchProjects: () => Promise<void>;
    fetchInvoices: () => Promise<void>;
    addProject: (project: IProject) => Promise<void>;
    addInvoice: (invoice: Omit<IInvoice, "id">) => Promise<void>;
    updateInvoice: (invoice: IInvoice) => Promise<void>;
    updateProject: (project: IProject) => Promise<void>;
    deleteInvoice: (id: string) => Promise<void>;
    scheduleEmail: (invoiceId: string, emailSettings: IScheduledEmail) => Promise<void>;
};

export const useStore = create<AppState>((set, get) => ({
    projects: [],
    invoices: [],

    fetchProjects: async () => {
        try {
            const response = await fetch(`${API_URL}/projects`);
            if (!response.ok) throw new Error("Failed to fetch projects");
            const data = await response.json();
            set({ projects: data });
        } catch (error) {
            console.error(error);
        }
    },

    fetchInvoices: async () => {
        try {
            const response = await fetch(`${API_URL}/invoices`);
            if (!response.ok) throw new Error("Failed to fetch invoices");
            const data = await response.json();
            set({ invoices: data });
        } catch (error) {
            console.error(error);
        }
    },

    addProject: async (project) => {
        try {
            const response = await fetch(`${API_URL}/projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project),
            });
            if (!response.ok) throw new Error("Failed to add project");
            const newProject = await response.json();
            set((state) => ({ projects: [...state.projects, newProject] }));
        } catch (error) {
            console.error(error);
        }
    },

    addInvoice: async (invoice) => {
        try {
            const response = await fetch(`${API_URL}/invoices`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(invoice),
            });
            if (!response.ok) throw new Error("Failed to add invoice");
            const newInvoice = await response.json();
            set((state) => ({ invoices: [...state.invoices, newInvoice] }));
        } catch (error) {
            console.error("Error adding invoice:", error);
        }
    },

    updateInvoice: async (updatedInvoice) => {
        try {
            const response = await fetch(`${API_URL}/invoices/${updatedInvoice.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedInvoice),
            });
            if (!response.ok) throw new Error("Failed to update invoice");
            set((state) => ({
                invoices: state.invoices.map((invoice) =>
                    invoice.id === updatedInvoice.id ? updatedInvoice : invoice
                ),
            }));
        } catch (error) {
            console.error("Error updating invoice:", error);
        }
    },
    updateProject: async (updatedProject) => {
        try {
            const response = await fetch(`${API_URL}/projects/${updatedProject.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProject),
            });
            if (!response.ok) throw new Error("Failed to update project");
            set((state) => ({
                projects: state.projects.map((project) =>
                    project.id === updatedProject.id ? updatedProject : project
                ),
            }));
        } catch (error) {
            console.error("Error updating project:", error);
        }
    },
    deleteInvoice: async (id) => {
        try {
            const response = await fetch(`${API_URL}/invoices/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete invoice");
            set((state) => ({
                invoices: state.invoices.filter((invoice) => invoice.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    },

    scheduleEmail: async (invoiceId, emailSettings) => {
        try {
            const invoice = get().invoices.find((inv) => inv.id === invoiceId);
            if (invoice) {
                const updatedInvoice = { ...invoice, scheduledEmail: emailSettings };
                await get().updateInvoice(updatedInvoice);
            } else {
                console.error("Invoice not found for scheduling email");
            }
        } catch (error) {
            console.error("Error scheduling email:", error);
        }
    },
}));
