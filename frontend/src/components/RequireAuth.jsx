import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/AuthProvider';

const RequireAuth =(props) => {
    const { children } = props;
    const auth = useAuth();
    const location = useLocation();

    if(auth.user.loading) {
      return <p>loading...</p>
    }

    if (!auth.user.loggedIn) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
}

export default RequireAuth;