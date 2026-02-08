import GoogleOAuthFailure from "../../page/auth/GoogleOAuthFailure";
import SignIn from "../../page/auth/Sign-in";
import SignUp from "../../page/auth/Sign-up";
import WorkspaceDashboard from "../../page/workspace/Dashboard";
import Members from "../../page/workspace/Members";
import ProjectDetails from "../../page/workspace/ProjectDetails";
import Settings from "../../page/workspace/Settings";
import Tasks from "../../page/workspace/Tasks";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";
import InviteUser from "../../page/invite/InviteUser";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK, element: <GoogleOAuthFailure /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
  { path: PROTECTED_ROUTES.TASKS, element: <Tasks /> },
  { path: PROTECTED_ROUTES.MEMBERS, element: <Members /> },
  { path: PROTECTED_ROUTES.SETTINGS, element: <Settings /> },
  { path: PROTECTED_ROUTES.PROJECT_DETAILS, element: <ProjectDetails /> },
];

import PrivacyPolicy from "../../page/legal/PrivacyPolicy";
import TermsOfService from "../../page/legal/TermsOfService";
import HelpCenter from "../../page/legal/HelpCenter";

export const baseRoutePaths = [
  { path: BASE_ROUTE.INVITE_URL, element: <InviteUser /> },
  { path: BASE_ROUTE.PRIVACY, element: <PrivacyPolicy /> },
  { path: BASE_ROUTE.TERMS, element: <TermsOfService /> },
  { path: BASE_ROUTE.HELP, element: <HelpCenter /> },
];
