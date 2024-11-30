import { Navigate } from 'react-router-dom';

const RouteProtection = ({ element: Component,role, ...rest }: any) => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  if(!userDetails){
    return <Navigate to="/" />;
  }
  let to;
  if(userDetails.role === 'admin'){
    to = '/admin-dashboard'
  }else{
    to = '/user-dashboard'
  }

  if(userDetails?.role === role){
    return <Component {...rest} />
  }else{
    return <Navigate to={to} />;
  }

};

export default RouteProtection;