import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/AuthProvider';

const RequiredOut =(props) => {
    const { children } = props;
    let auth = useAuth();
    let location = useLocation();
    if (auth.user.loggedIn) {
      return <Navigate to="/messages" state={{ from: location.pathname }} />;
    }
  
    return children;
}

export default RequiredOut;