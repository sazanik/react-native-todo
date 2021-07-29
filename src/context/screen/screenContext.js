import {createContext, useContext} from "react";

export const ScreenContext = createContext(null)

export const useScreen = () => useContext(ScreenContext)

