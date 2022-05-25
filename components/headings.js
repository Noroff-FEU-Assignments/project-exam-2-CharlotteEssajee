import { styled } from "goober";

export function Heading1({ text }) {
    return (
        <>
            <Heading1Styled>{text}</Heading1Styled>
        </>
    );
}

const Heading1Styled = styled("h1")`
    font-size: 50px;
    color: var(--main-brand-color);
    font-weight: 700;
`;