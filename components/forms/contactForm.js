import { createMessage } from "@lib/rest";
import { styled } from "goober";
import { useState } from "react";
import { Loading } from "@components/lottie";
import Notif from "./notif";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [notif, setNotif] = useState(false);

    async function send(e) {
        e.preventDefault();
        setLoading(true);

        var data = JSON.stringify({
            title: `${name} - ${email}`,
            status: "publish",
            acf: {
                name: name,
                email: email,
                phone: phone,
                message: message,
            },
        });
        var res = await createMessage(data);

        if (res.id) {
            setLoading(false);
            setNotif(true);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");

            setTimeout(() => {
                setNotif(false);
            }, 5000);
        } else {
            setLoading(false);
            setError("Something went wrong");
            setNotif(true);

            setTimeout(() => {
                setNotif(false);
            }, 5000);
        }
    }

    return (
        <>
            <Wrapper>
                <Form onSubmit={send}>
                    <div className="input-field">
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name" className={name && "filled"}>
                            Name
                        </label>
                    </div>

                    <div className="input-field">
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className={email && "filled"}>
                            Email
                        </label>
                    </div>

                    <div className="input-field">
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label htmlFor="phone" className={phone && "filled"}>
                            Phone
                        </label>
                    </div>

                    <div className="input-field">
                        <textarea
                            id="message"
                            required
                            rows="6"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <label
                            htmlFor="message"
                            className={message && "filled"}
                        >
                            Message
                        </label>
                    </div>

                    <button className="submit-btn" type="submit">
                        Send
                    </button>
                </Form>
                {loading && (
                    <div className="galleryLoading">
                        <Loading />
                    </div>
                )}
            </Wrapper>
            {!error && notif && (
                <Notif
                    notif={notif}
                    setNotif={setNotif}
                    text="Thank you. We will answer you shortly."
                />
            )}
            {error && notif && (
                <Notif notif={notif} setNotif={setNotif} text={error} />
            )}
        </>
    );
}

const Wrapper = styled("div")`
    position: relative;
    .galleryLoading {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        border-radius: var(--border-radius);

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Form = styled("form")`
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }

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

    .input-field textarea {
        border-radius: var(--border-radius);
        border: none;
        padding: 32px 16px 4px 16px;
        font-size: 16px;
        line-height: 1;
        outline: none;
        box-shadow: none;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        background-color: #f6f6f6;
    }

    .input-field .filled {
        transform: translate(0, 12px) scale(0.8);
    }

    .input-field:focus-within label {
        transform: translate(0, 12px) scale(0.8);
        color: var(--label-focus);
    }

    .select-container {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .select-container:focus-within label {
        color: var(--label-focus);
    }

    .select-container label {
        position: absolute;
        pointer-events: none;
        transform: translate(0, 12px) scale(0.8);
        transform-origin: top left;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        color: var(--label);
        font-size: 16px;
        line-height: 1;
        left: 16px;
    }

    .select-container select {
        height: 64px;
        border-radius: var(--border-radius);
        border: none;
        padding: 24px 16px 4px 16px;
        font-size: 16px;
        line-height: 2;
        outline: none;
        box-shadow: none;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        background-color: #f6f6f6;
        -moz-appearance: none;
        appearance: none;
        text-overflow: unset;
        color: var(--text);
        cursor: pointer;
    }

    .select-container select:focus {
        box-shadow: 0 0 0 2px var(--input-focus);
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
