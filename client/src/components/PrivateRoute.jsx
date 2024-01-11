import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";   // It will display the child of this component if condition is fulfilled



export default function PrivateRoute() {
  const {currentUser}=useSelector((state)=>state.user)
  return currentUser? <Outlet/>: <Navigate to="/sign-in"/>
}


