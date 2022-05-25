import { store } from "@risingstack/react-easy-state";
import state from "./state";

const actions = store({
        setIsAdmin: (value) => {
            state.isAdmin = value;
            window.localStorage.setItem("isAdmin", value);
        },
        setUser: (value) => {
            state.user = value;
            window.localStorage.setItem("user", value);
        },
        setJwtToken: (value) => {
            state.jwtToken = value;
            window.localStorage.setItem("jwtToken", value);
        },
        setSearchModalOpen: (value) => {
            state.searchModalOpen = value;
        }
});

export default actions;