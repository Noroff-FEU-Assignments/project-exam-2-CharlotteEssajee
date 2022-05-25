import { styled } from "goober";

export default function BookingForm({
    checkin,
    checkout,
    people,
    setCheckin,
    setCheckout,
    setPeople,
    showModal,
    setShowModal,
}) {
    function handleSubmit(e) {
        e.preventDefault();
        setShowModal(true);
        window.scrollTo({ top: 0 });
    }

    return (
        <>
            <Container onSubmit={handleSubmit}>
                <div className="__inner">
                    <div className="input-field">
                        <input
                            id="checkin"
                            type="date"
                            value={checkin}
                            onChange={(e) => {
                                setCheckin(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="checkin" className="filled">
                            Check in
                        </label>
                    </div>
                    <div className="input-field">
                        <input
                            id="checkout"
                            type="date"
                            value={checkout}
                            onChange={(e) => {
                                setCheckout(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="checkout" className="filled">
                            Check out
                        </label>
                    </div>
                    <div className="input-field">
                        <input
                            id="people"
                            type="number"
                            value={people}
                            onChange={(e) => {
                                setPeople(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="people" className={people && "filled"}>
                            People
                        </label>
                    </div>
                    <div>
                        <button className="submit-btn" type="submit">
                            Book now
                        </button>
                    </div>
                </div>
            </Container>
        </>
    );
}

const Container = styled("form")`
    margin: 60px 0;
    display: flex;

    .__inner {
        display: flex;
        overflow: hidden;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);

        @media (max-width: 768px) {
            flexDirection: column;
            
            button {
                width: 100%;
            }
        }
    }

    .input-field {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .input-field input {
        height: 64px;
        border-radius: 12px;
        border: none;
        padding: 24px 16px 4px 16px;
        font-size: 16px;
        line-height: 1;
        outline: none;
        box-shadow: none;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

        &:hover {
            cursor: pointer;
        }

        @media (max-width: 768px) {
            backgroundColor: #fff;
            borderRadius: 0;
            borderBottom: 1px solid #e4e5e7;
        }
    }

    .input-field label {
        position: absolute;
        pointer-events: none;
        transform: translate(0, 23px) scale(1);
        transform-origin: top left;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        font-size: 16px;
        line-height: 1;
        left: 16px;
    }

    .input-field .filled {
        transform: translate(0, 12px) scale(0.8);
    }

    .input-field:focus-within label {
        transform: translate(0, 12px) scale(0.8);
    }

    .submit-btn {
        border-radius: 0 12px 12px 0;
        padding: 20px 30px;
        border: none;
        background-color: var(--main-brand-color);
        color: #fff;
        cursor: pointer;
    }
`;
