import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    onError: async (error) => {
        if (error?.status === 401) {
            return {
                logout: true,
                error: { message: "Unauthorized" },
            }
        }

        return {};
    },
    getIdentity: async () => {
      const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
          headers: {
              Authorization: localStorage.getItem("my_access_token"),
          },
      });

      if (response.status < 200 || response.status > 299) {
        return null;
      }

      const data = await response.json();

      return data;
    },
    logout: async () => {
        localStorage.removeItem("my_access_token");
        return { success: true, redirectTo: "/login" };
    },
    // login method receives an object with all the values you've provided to the useLogin hook.
    login: async ({ email, password }) => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("my_access_token", data.token);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
        const token = localStorage.getItem("my_access_token");

        return { authenticated: Boolean(token) };
    },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};