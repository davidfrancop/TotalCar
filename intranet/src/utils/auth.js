// Archivo: intranet/src/utils/auth.js

export function isAuthenticated() {
  return !!sessionStorage.getItem("token");
}

export function getRole() {
  return sessionStorage.getItem("role");
}

export function logout() {
  sessionStorage.clear();
}