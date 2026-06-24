import { createBrowserRouter } from "react-router";
import { LoginPage } from "./components/LoginPage";
import { EventsPage } from "./components/EventsPage";
import { EventDetailPage } from "./components/EventDetailPage";
import { EventRegistrationPage } from "./components/EventRegistrationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/events",
    Component: EventsPage,
  },
  {
    path: "/events/:id",
    Component: EventDetailPage,
  },
  {
    path: "/events/:id/register",
    Component: EventRegistrationPage,
  },
]);
