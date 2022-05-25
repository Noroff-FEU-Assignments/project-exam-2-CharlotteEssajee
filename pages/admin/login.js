import { styled } from "goober";
import LoginForm from "@components/admin/login";
import Header from "@components/header/header";
import state from "@context/state";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "@components/head";
import Standard from "@components/layout";

export default function Login() {
    const [mounted, setMounted] = useState(false);
    const { isAdmin } = state;

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <>
                <Header />
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
                <Head title="Holidaze - Login" />
                <Standard>
                    <Container>
                        <LoginForm />
                    </Container>
                </Standard>
            </>
        );
    }

    if (isAdmin && mounted) {
        return (
            <>
                <Header />
                <Standard>
                    <Container>
                        <h2>You are already logged in.</h2>
                        <button>
                            <Link href="/admin">Go to admin</Link>
                        </button>
                    </Container>
                </Standard>
            </>
        );
    }
}

const Container = styled("div")`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 15px;
`;

