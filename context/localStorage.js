import state from "./state";
import { view } from "@risingstack/react-easy-state";
import { useEffect } from "react";

const LocalStorage = () => {
    useEffect(() => {
        if (window.localStorage.getItem("isAdmin")) {
            state.isAdmin = window.localStorage.getItem("isAdmin");
        }
        if (window.localStorage.getItem("jwtToken")) {
            state.jwtToken = window.localStorage.getItem("jwtToken");
        }
    }, []);
    return null;
};

export default view(LocalStorage);