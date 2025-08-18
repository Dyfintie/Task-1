import { create } from "zustand";

const safeParse = (v) => {
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
};

export const useAuth = create((set, get) => ({
  u: safeParse(localStorage.getItem("user")) || null,
  t: localStorage.getItem("token") || null,

  setAuth: (u, t) => {
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    set({ u, t });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ u: null, t: null });
  },

  isAuth: () => {
    const { u, t } = get();
    return !!(u && t);
  },
}));
