import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {  selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';
import { UserType } from "constants/Constant";

export const ProtectedRoute = ({ element: Element }) => {
  const { pathname } = useLocation();
  const count =useSelector(selectCount);
  const key = count?.payload?.id;
  const loginTypeKey= UserType.Admin;

  if (!key && loginTypeKey && ["/adminfeedback"].includes(pathname)) {
    return <Navigate to="/" />;
  }
  if (!key && loginTypeKey && ["/adminnotifications"].includes(pathname)) {
    return <Navigate to="/" />;
  }

  if (!key && loginTypeKey && ["/adminusers"].includes(pathname)) {
    return <Navigate to="/" />;
  }

if (!key && loginTypeKey && ["/admincreateboard"].includes(pathname)) {
    return <Navigate to="/" />;
  }
  
if (!key && ["/usercreatepost"].includes(pathname)) {
  return <Navigate to="/" />;
}
if (!key && ["/userroadmapone"].includes(pathname)) {
  return <Navigate to="/" />;
}

  return <Element />;
};

export const ProtectedRouteLogin = ({ element: Element }) => {
  const { pathname } = useLocation();
  const key = localStorage.getItem('INVITE');

  if (!key && ["/signup"].includes(pathname)) {
    return <Navigate to="/" />;
  }

  
  return <Element />;
};