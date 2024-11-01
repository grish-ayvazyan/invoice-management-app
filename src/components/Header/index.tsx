import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { headerRoutes } from "@/config/routes";

const Header = () => {
    const location = useLocation();
    return (
        <header className="flex h-20  justify-center items-center px-4 md:px-6 mx-auto mb-8">
            <div className="space-x-4">
                {headerRoutes.map((route) => (
                    <Button
                        asChild
                        key={route.path}
                        variant="link"
                        className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium  hover:bg-gray-800 hover:text-gray-50 disabled:pointer-events-none disabled:opacity-50  ${
                            location.pathname === route.path ? "bg-gray-800/50" : ""
                        } `}
                    >
                        <Link to={route.path}>{route.title}</Link>
                    </Button>
                ))}
            </div>
        </header>
    );
};

export default Header;
