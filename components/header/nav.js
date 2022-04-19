import { styled } from "goober";
import Link from "next/link";

export default function Nav() {
    return (
        <>
            <NavContainer>
                <Link href="/" passHref>
                    <a>Home</a>
                </Link>
                <Link href="/places" passHref>
                    <a>Places</a>
                </Link>
                <Link href="/contact" passHref>
                    <a>Contact</a>
                </Link>
            </NavContainer>
        </>
    );
}

const NavContainer = styled("nav")`
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;

    a {
        text-decoration: none;
        font-weight: 500;
    }
`;
