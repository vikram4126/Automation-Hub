import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext();

export const ROLES = {
  USER: 'Employee',
  LEADERSHIP: 'Leadership',
  ADMIN: 'System Admin'
};

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(ROLES.USER);

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, ROLES }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
