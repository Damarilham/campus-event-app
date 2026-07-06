import { RouterProvider, Navigate, createBrowserRouter } from 'react-router';
import { Toaster } from 'sonner';
import { LoginPage } from './components/LoginPage';
import { EventsPage } from './components/EventsPage';
import { EventDetailPage } from './components/EventDetailPage';
import { EventRegistrationPage } from './components/EventRegistrationPage';
import { EventLogPage } from './components/EventLogPage';
import { SplashPage } from './components/SplashPage';

import { SettingsPage } from './components/SettingsPage';

function RootRedirect() {
  const seen = localStorage.getItem("campus_onboarding_seen");
  if (!seen) return <Navigate to="/splash" replace />;
  return <LoginPage />;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootRedirect,
  },
  {
    path: "/splash",
    Component: SplashPage,
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
      {
        path: "/settings",
        Component: SettingsPage,
      },
    ]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}
