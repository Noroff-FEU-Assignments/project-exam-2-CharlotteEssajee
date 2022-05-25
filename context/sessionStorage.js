import { useEffect } from "react";
const USERNAME = "Noroff";
const PASS = "Admin123!321";

export default function SessionStorage() {
    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
        };
        fetch("https://ce.accelr.dev/wp-json/jwt-auth/v1/token", {
            method: "POST",
            headers,
            body: JSON.stringify({
                username: USERNAME,
                password: PASS,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                window.sessionStorage.setItem("jwtToken", data.data.token);
            });
    });
    return null;
}
