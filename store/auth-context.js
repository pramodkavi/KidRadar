import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  uId:'',
  isAuthenticated: false,
  authenticate: (token) => {},
  setUID: (id) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [uid, setUid] = useState("");


  function authenticate(token) {
    setAuthToken(token);
  }

  function setUID(id){
    setUid(id);
  }
  function logout() {
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    uId:uid,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    setUID:setUID,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
