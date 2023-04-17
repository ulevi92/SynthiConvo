import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { FormDispatch, FormRootState } from "./formStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//configure custom formStore types
export const useFormDispatch: () => FormDispatch = useDispatch;
export const useFormSelector: TypedUseSelectorHook<FormRootState> = useSelector;
