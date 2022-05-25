import { SearchIcon } from "@components/icons";
import { styled } from "goober";
import Link from "next/link";
import actions from "@context/actions";

export default function Nav() {
    const { setSearchModalOpen } = actions;
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
                <div style={{cursor: "pointer"}}>
                    <SearchIcon
                        size="25px"
                        color="#000"
                        onClick={() => setSearchModalOpen(true)}
                    />
                </div>
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
