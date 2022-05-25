import { styled } from "goober";

export default function Standard({ children }) {
    return (
        <>
            <Container>
                <__inner>{children}</__inner>
            </Container>
        </>
    );
}

const Container = styled("div")`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 15px;
`;

const __inner = styled("div")`
    width: 100%;
    max-width: 1200px;
`;
