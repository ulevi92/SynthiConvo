import store from "../../../redux/store";

export const isAuth = store.getState().authUser.auth.isAuth;

type AuthNavLinks = {
  path: string;
  title: string;
};

export const authNavLinks: AuthNavLinks[] = [
  { path: "/", title: "home" },
  { path: "/about", title: "about" },
];
