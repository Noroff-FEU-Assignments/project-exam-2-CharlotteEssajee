import { store } from "@risingstack/react-easy-state";

const state = store({
    isAdmin: false,
    user: "",
    jwtToken: "",
});

export default state;
