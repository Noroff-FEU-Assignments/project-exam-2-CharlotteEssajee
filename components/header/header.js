import Nav from "./nav";
import { styled } from "goober";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <Container>
                <__inner>
                    <Logo>
                        <Link href="/" passHref>
                            <a>Holidaze</a>
                        </Link></Logo>
                    <Nav />
                </__inner>
            </Container>
        </>
    );
}

const Logo = styled("span")`

    a {
        font-family: "Bely Display";
        font-size: 25px;
        color: var(--main-brand-color);
        textDecoration: none;
    }
`;

const Container = styled("div")`
    width: 100%;
    display: flex;
    justify-content: center;
    position: sticky;
    background-color: #fff;
    padding: 15px;

    @media (max-width: 468px) {
        -webkit-box-shadow: 0 4px 6px -6px #222;
        -moz-box-shadow: 0 4px 6px -6px #222;
        box-shadow: 0 4px 6px -6px #222;
        marginBottom: 20px;
    }
`;

const __inner = styled("div")`
    display: flex;
    width: 100%;
    max-width: 1200px;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 468px) {
        flexDirection: column;
        gap: 20px;
    }
`;
