import { lazy, Suspense } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Header from "@/components/Header";

const Invoices = lazy(() => import("@/pages/Invoices"));
const Projects = lazy(() => import("@/pages/Projects"));

function App() {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Header />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/projects" replace />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/invoices" element={<Invoices />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
