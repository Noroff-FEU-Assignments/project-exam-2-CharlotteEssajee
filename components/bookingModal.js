import { styled } from "goober";
import Image from "next/image";
import { CloseIcon } from "./icons";
import { useState } from "react";
import { formatDate } from "@utils/functions";
import { createInquiry } from "@lib/rest";
import { Loading } from "./lottie";
import Notif from "./forms/notif";

export default function BookingModal({
    checkin,
    checkout,
    people,
    setShowModal,
    image,
    title,
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [notif, setNotif] = useState(false);

    var date1 = new Date(checkin);
    var date2 = new Date(checkout);
    var timeDifference = date2.getTime() - date1.getTime();
    var days = timeDifference / (1000 * 3600 * 24);

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        var data = JSON.stringify({
            title: `${name} - ${formatDate(checkin)}`,
            status: "publish",
            acf: {
                name: name,
                email: email,
                dates: `${formatDate(checkin)} - ${formatDate(checkout)}`,
                people: people,
                cabin: title,
            },
        });
        var res = await createInquiry(data);

        if (res.id) {
            setLoading(false);
            setNotif(true);
            setName("");
            setEmail("");

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
            <Container>
                <Modal>
                    <div className="image">
                        <Image
                            src={image}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="content">
                        <h2>{title}</h2>

                        <table>
                            <tbody>
                                <tr>
                                    <th>Date:</th>
                                    <td>{`${formatDate(checkin)} - ${formatDate(
                                        checkout
                                    )}`}</td>
                                </tr>
                                <tr>
                                    <th>People:</th>
                                    <td>{people}</td>
                                </tr>
                                <tr>
                                    <th>Total:</th>
                                    <td>{days * 1299},-</td>
                                </tr>
                            </tbody>
                        </table>
                        <Wrapper>
                            <Form onSubmit={submit}>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <label className={name && "filled"}>
                                        Full name
                                    </label>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <label className={email && "filled"}>
                                        Email
                                    </label>
                                </div>
                                <div>
                                    <button
                                        className="submit-btn"
                                        type="submit"
                                    >
                                        Send request
                                    </button>
                                </div>
                            </Form>
                            {loading && (
                                <div className="galleryLoading">
                                    <Loading />
                                </div>
                            )}
                        </Wrapper>
                    </div>
                    <div className="close-modal">
                        <CloseIcon
                            onClick={() => setShowModal(false)}
                            size="35px"
                            color="#000"
                        />
                    </div>
                </Modal>
            </Container>
            <Overlay onClick={() => setShowModal(false)} />
            {!error && notif && (
                <Notif
                    notif={notif}
                    setNotif={setNotif}
                    text="Your booking has been sent!"
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

const Modal = styled("div")`
    display: grid;
    grid-template-columns: 40% auto;
    gap: 30px;
    width: 100%;
    max-width: 1200px;
    padding: 30px;
    background-color: #fff;
    border-radius: var(--border-radius);
    z-index: 3;
    position: relative;

    @media (max-width: 768px) {
        grid-template-columns: 100%;
    }

    .image {
        width: 100%;
        height: 600px;
        position: relative;

        img {
            border-radius: var(--border-radius);
        }

        @media (max-width: 768px) {
            height: 300px;
            margin-top: 40px;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 30px;
        justify-content: center;

        h2 {
            margin: 0;
        }

        th {
            text-align: left;
        }
    }

    .close-modal {
        position: absolute;
        top: 30px;
        right: 30px;
        cursor: pointer;
    }
`;

const Overlay = styled("div")`
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
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
