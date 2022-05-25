import { styled } from "goober";
import Header from "@components/header/header";
import { getEnquiries } from "@lib/rest";
import state from "@context/state";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@components/footer";
import Head from "@components/head";

export default function Enquiries({ enquiries }) {
    const [mounted, setMounted] = useState(false);
    const { isAdmin } = state;

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Enquiries" />
                <Container>Loading...</Container>
            </>
        );
    }

    if (!isAdmin && mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Enquiries" />
                <Container>
                    <h2>You have to be logged in to view this page.</h2>
                    <button>
                        <Link href="/admin/login">Go to login</Link>
                    </button>
                </Container>
            </>
        );
    }

    if (isAdmin && mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Enquiries" />
                <Container>
                    <h2>Enquiries</h2>
                    {enquiries.map((inquiry) => {
                        return (
                            <Card key={inquiry.id}>
                                <h2>{inquiry.acf.name}</h2>
                                <p>Email: {inquiry.acf.email}</p>
                                <p>Dates: {inquiry.acf.dates}</p>
                                <p>People: {inquiry.acf.people}</p>
                                <p>Cabin: {inquiry.acf.cabin}</p>
                            </Card>
                        );
                    })}
                </Container>
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
