import { styled } from "goober";
import { CloseIcon } from "@components/icons";

export default function Notif({ notif, setNotif, text }) {
    function handleClick() {
        setNotif(!notif);
    }
    return (
        <>
            <Container>
                <div className="__inner">
                    <div>{text}</div>
                    <div className="closeIcon">
                        <CloseIcon
                            size="30px"
                            color="#fff"
                            onClick={handleClick}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}

const Container = styled("div")`
    position: absolute;
    top: 82.5px;
    right: 30px;
    z-index: 3;

    .__inner {
        position: relative;
        border-radius: var(--border-radius);
        background-color: #000;
        color: #fff;
        padding: 30px;
        padding-right: 60px;

        .closeIcon {
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;
        }
    }
`;
