import { styled } from "goober";
import Header from "@components/header/header";
import { getEnquiries } from "@lib/rest";
import state from "@context/state";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@components/footer";
import Head from "@components/head";
import Standard from "@components/layout";

export default function Admin() {
    const [mounted, setMounted] = useState(false);
    const { isAdmin, user } = state;

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Admin"/>
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
                <Head title="Holidaze - Admin" />
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
                <Head title="Holidaze - Admin" />
                <Standard>
                    <Container>
                        <h1>Hello, {user}!</h1>
                        <div className="card">
                            <Link href="/admin/enquiries">Enquiries</Link>
                        </div>
                        <div className="card">
                            <Link href="/admin/messages">Messages</Link>
                        </div>
                        <div className="card fullWidth">
                            <Link href="/admin/new">Add new place</Link>
                        </div>
                    </Container>
                </Standard>
                <Footer />
            </>
        );
    }
}

export async function getServerSideProps() {
    const enquiries = await getEnquiries();

    return {
        props: {
            enquiries,
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
    box-shadow: var(--shadow);

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;

    h1 {
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

    .fullWidth {
        grid-column: span 2;
    }

    .card {
        height: 200px;
        width: 100%;
        border-radius: var(--border-radius);
        background-color: #f8f8f8;

        display: flex;
        justify-content: center;
        align-items: center;

        a {
            text-decoration: none;
            font-size: 1.25rem;
        }
    }
`;
