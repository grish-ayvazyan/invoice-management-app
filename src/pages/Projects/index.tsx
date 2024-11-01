import React from "react";

import CreateProject from "@/components/Project/CreateProject";
import ProjectList from "@/components/Project/ProjectList";

export const Projects: React.FC = () => {
    return (
        <div className="flex w-full space-x-2">
            <CreateProject />
            <ProjectList />
        </div>
    );
};

export default Projects;
