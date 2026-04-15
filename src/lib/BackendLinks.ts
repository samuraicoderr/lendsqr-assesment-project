export const baseURL = "/mock-api";


export const BackendRoutes = {
  /* ----------------------------- AUTH ----------------------------- */
  health: `${baseURL}/health`,
  me: `${baseURL}/users/me`,
  getUsers: `${baseURL}/users`,
  getUser: (id: string) => `${baseURL}/users/${id}`,
  loginFirstFactor: `${baseURL}/auth/login`,
  refreshToken: `${baseURL}/auth/refreshToken`,
  register: `${baseURL}/auth/register`,
};