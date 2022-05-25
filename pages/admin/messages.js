import { styled } from "goober";
import Header from "@components/header/header";
import { getMessages } from "@lib/rest";
import state from "@context/state";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@components/footer";
import Head from "@components/head";
import Standard from "@components/layout";

export default function Messages({ messages }) {
    const [mounted, setMounted] = useState(false);
    const { isAdmin } = state;

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Messages" />
                <Standard>
                    <Container>Loading...</Container>
                </Standard>
            </>
        );
    }

    if (!isAdmin && mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Messages" />
                <Standard>
                    <Container>
                        <h2>You have to be logged in to view this page.</h2>
                        <button>
                            <Link href="/admin/login">Go to login</Link>
                        </button>
                    </Container>
                </Standard>
            </>
        );
    }

    if (isAdmin && mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Messages" />
                <Standard>
                    <Container>
                        <h2>Messages</h2>
                        {messages.map((message) => {
                            return (
                                <Card key={message.id}>
                                    <h2>{message.acf.name}</h2>
                                    <p>Email: {message.acf.email}</p>
                                    <p>Phone: {message.acf.phone}</p>
                                    <p>Message: {message.acf.message}</p>
                                </Card>
                            );
                        })}
                    </Container>
                </Standard>
                <Footer />
            </>
        );
    }
}

export async function getServerSideProps() {
    const messages = await getMessages();

    return {
        props: {
            messages,
        },
    };
}

const Container = styled("div")`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 30px;
    border-radius: var(--border-radius);
    border: 1px solid #eee;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    box-shadow: var(--shadow);

    @media (max-width: 768px) {
        display: block;
    }

    h2 {
        grid-column: span 2;
        color: var(--main-brand-color);
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 30px;
            font-weight: 500;
            letter-spacing: 0.02rem;
        }
    }
`;

const Card = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border-radius: var(--border-radius);
    background-color: #f8f8f8;

    @media (max-width: 768px) {
        margin: 20px 0;
    }

    * {
        margin: 0;
    }
`;
