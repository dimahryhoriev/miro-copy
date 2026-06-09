import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { enableMocking } from "@/shared/api/mocks";

enableMocking().then(async () => {
    const { router } = await import('./router');

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
})