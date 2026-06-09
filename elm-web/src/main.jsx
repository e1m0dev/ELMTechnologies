import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import {TopicsList} from "./pages/topics/TopicsList.jsx";
import {LoginPage} from "./pages/login/LoginPage.jsx";
import {NotFound} from "./pages/NFound/NotFound.jsx";
import {CreateTopic} from "./pages/topics/CreateTopic.jsx";
import {DevelopersPage} from "./pages/developers/DevelopersPage.jsx";
import {TopicContent} from "./pages/topics/TopicContent.jsx";
import {InfoPage} from "./pages/main/InfoPage.jsx";
import {AdminPage} from "./pages/Admin/AdminPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        ),
        children: [
            {
                index: true,
                element: (
                    <InfoPage />
                )
            },
            {
                path: "main",
                element: (
                    <InfoPage />
                )
            },
            {
                path: "topics",
                element: (
                    <TopicsList />
                )
            },
            {
                path: "create-topic",
                element: (
                    <CreateTopic />
                )
            },
            {
                path: "developers",
                element: (
                    <DevelopersPage />
                )
            },
            {
                path: "admin",
                element: (
                    <AdminPage/>
                )
            },
            {
                path: "topics/:category/topic/:id",
                element: (
                    <TopicContent />
                )
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
