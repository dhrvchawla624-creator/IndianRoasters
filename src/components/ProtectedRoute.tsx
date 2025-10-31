import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  redirectPath?: string;
}

/**
 * A component that renders its children only if the user is logged in.
 * Otherwise, it redirects the user to the specified redirect path.
 *
 * @param {boolean} isLoggedIn - Whether the user is logged in.
 * @param {string} [redirectPath='/login'] - The path to redirect to if the user is not logged in.
 */
function ProtectedRoute({ isLoggedIn, redirectPath = '/login' }: ProtectedRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;