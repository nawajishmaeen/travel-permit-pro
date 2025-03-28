
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      console.log('Protected route check - User:', !!user, 'Role:', userRole, 'Required:', requiredRole);
      
      // If no user is logged in, redirect to auth page
      if (!user) {
        console.log('No user found, redirecting to auth');
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
        });
        
        // Pass admin=true param if trying to access admin routes
        if (requiredRole === 'admin') {
          navigate('/auth?admin=true');
        } else {
          navigate('/auth');
        }
        return;
      }
      
      // If a specific role is required and user doesn't have it
      if (requiredRole && userRole !== requiredRole) {
        console.log(`Required role: ${requiredRole}, User role: ${userRole}`);
        
        if (requiredRole === 'admin' && userRole !== 'admin') {
          console.log('Admin role required but user is not admin, redirecting to dashboard');
          toast({
            title: "Access restricted",
            description: "You need administrator privileges to access this page",
            variant: "destructive",
          });
          navigate('/dashboard');
        } else if (requiredRole === 'user' && userRole === 'admin') {
          console.log('User role required but user is admin, redirecting to admin');
          navigate('/admin');
        }
      }
    }
  }, [user, userRole, loading, navigate, requiredRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-teal border-t-transparent rounded-full" />
      </div>
    );
  }

  // Only render children if authentication and authorization are successful
  if (!user || (requiredRole && userRole !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
