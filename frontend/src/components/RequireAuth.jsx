import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/AuthProvider';

const RequireAuth =(props) => {
    const { children } = props;
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user.loggedIn) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
}

export default RequireAuth;