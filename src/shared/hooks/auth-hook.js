import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setToken(token);
    const currentTimePlusHour =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(currentTimePlusHour);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expirationDate: currentTimePlusHour.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remaingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remaingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpirationDate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.userId &&
      userData.token &&
      new Date(userData.expirationDate) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.expirationDate));
    }
  }, [login]);

  return { userId, token, isLoggedIn, login, logout };
};
