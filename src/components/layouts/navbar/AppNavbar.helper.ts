import store from "../../../redux/store";

export const isAuth = store.getState().auth.isAuth;

type AuthNavLinks = {
  path: string;
  title: string;
};

export const authNavLinks: AuthNavLinks[] = [
  { path: "/home", title: "home" },
  { path: "/about", title: "about" },
  { path: "/", title: "welcome page" },
];
