import Nav from "./nav";
import { styled } from "goober";

export default function Header() {
    return (
        <>
            <Container>
                <__inner>
                    <Logo>Holidaze</Logo>
                    <Nav />
                </__inner>
            </Container>
        </>
    );
}

const Logo = styled("span")`
    font-family: "Bely Display";
    font-size: 25px;
    color: var(--main-brand-color);
`;

const Container = styled("div")`
    width: 100%;
    display: flex;
    justify-content: center;
    position: sticky;
    background-color: #fff;
    z-index: 999;
    padding: 15px;
`;

const __inner = styled("div")`
    display: flex;
    width: 100%;
    max-width: 1200px;
    justify-content: space-between;
    align-items: center;
`;
