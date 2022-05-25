import { styled } from "goober";
import { useState } from "react";
import { login } from "@lib/rest";
import { useRouter } from "next/router";
import actions from "@context/actions";

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setIsAdmin, setJwtToken, setUser } = actions;

    async function submit(e) {
        e.preventDefault();
        var data = JSON.stringify({
            username: username,
            password: password,
        });
        var res = await login(data);
        if (res?.success) {
            setIsAdmin(true);
            setUser(res.data.displayName);
            setJwtToken(res.data.token);
            router.push("/admin");
        }
    }

    return (
        <>
            <Container>
                <Form onSubmit={submit}>
                    <div className="input-field">
                        <input
                            type="text"
                            id="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className={username && "filled"}>Username</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className={password && "filled"}>Password</label>
                    </div>
                    <div>
                        <button className="submit-btn" type="submit">
                            Login
                        </button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

const Container = styled("div")`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;

    @media (max-width: 768px) {
        height: auto;
        min-height: 100%;
    }
`;

const Form = styled("form")`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 350px;

    .input-field {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .input-field input {
        height: 64px;
        border-radius: var(--border-radius);
        border: none;
        padding: 24px 16px 4px 16px;
        font-size: 16px;
        line-height: 1;
        outline: none;
        box-shadow: none;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        background-color: #f6f6f6;
    }

    .input-field label {
        position: absolute;
        pointer-events: none;
        transform: translate(0, 23px) scale(1);
        transform-origin: top left;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        color: var(--label);
        font-size: 16px;
        line-height: 1;
        left: 16px;
    }

    .input-field .filled {
        transform: translate(0, 12px) scale(0.8);
    }

    .input-field:focus-within label {
        transform: translate(0, 12px) scale(0.8);
        color: var(--label-focus);
    }

    .submit-btn {
        border-radius: var(--border-radius);
        padding: 20px 50px;
        border: none;
        background-color: var(--main-brand-color);
        box-shadow: var(--shadow);
        color: #fff;
        cursor: pointer;
        width: 100%;
    }
`;
