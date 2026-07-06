import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "./components/LoginPage";
import { EventsPage } from "./components/EventsPage";
import { EventDetailPage } from "./components/EventDetailPage";
import { EventRegistrationPage } from "./components/EventRegistrationPage";
import { EventLogPage } from "./components/EventLogPage";
import { SplashPage } from "./components/SplashPage";

function SplashGuard() {
  const seen = localStorage.getItem("campus_onboarding_seen");
  return seen ? <Navigate to="/" replace /> : <SplashPage />;
}

export const router = createBrowserRouter([
  {
    path: "/splash",
    Component: SplashGuard,
  },
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
  {
    path: "/event-log",
    Component: EventLogPage,
  },
]);
