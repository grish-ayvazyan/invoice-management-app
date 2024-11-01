export type IRoute = {
    title: string;
    path: string;
};

export const headerRoutes: IRoute[] = [
    {
        title: "Projects",
        path: "/projects",
    },
    {
        title: "Invoices",
        path: "/invoices",
    },
];
