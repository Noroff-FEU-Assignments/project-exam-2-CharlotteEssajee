import { styled } from "goober";
import Standard from "@components/layout";
import { FacebookIcon, InstaIcon, PawIcon, PinterestIcon } from "./icons";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <Standard>
                <SiteFooter>
                    <div className="footer-right">
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FacebookIcon size="30px" color="#fff" />
                        </span>
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <InstaIcon size="30px" color="#fff" />
                        </span>
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <PinterestIcon size="30px" color="#fff" />
                        </span>
                    </div>

                    <div className="footer-left">
                        <p className="footer-links">
                            <Link href="/"><a>Home</a></Link>
                            <Link href="/places"><a>Places</a></Link>
                            <Link href="/contact"><a>Contact</a></Link>
                        </p>

                        <p className="copyright">Holidaze &copy; 2022</p>
                    </div>
                </SiteFooter>
            </Standard>
        </>
    );
}

const SiteFooter = styled("div")`
    background-color: rgba(0, 0, 0, 0.75);
    text-align: left;
    padding: 45px 50px;
    border-radius: var(--border-radius);
    margin-top: 2em;

    @media (max-width: 768px) {
        text-align: center;
    }

    .footer-left p {
        color: #fff;
        margin: 0;
        padding: 10px;
    }

    .copyright {
        font-size: 14px;
    }

    .footer-links {
        font-weight: 600;
        color: #fff;
        margin: 0 0 10px;
        padding: 0;
        transition: ease 0.25s;

        a {
            display: inline-block;
            line-height: 1.8;
            text-decoration: none;
            color: inherit;
            transition: ease 0.25s;
        }

        a:after {
            content: "·";
            font-size: 20px;
            left: 0;
            color: #fff;
            display: inline-block;
            padding: 0 10px 0 10px;
        }

        a:hover {
            text-decoration: underline;
        }
    }

    .footer-right {
        float: right;
        margin-top: 6px;
        max-width: 180px;
        color: #fff;
        display: flex;
        flex-direction: row;

        @media (max-width: 768px) {
            float: none;
            max-width: 100%;
            justifyContent: center;
        }

        a {
            display: inline-block;
            width: 35px;
            height: 35px;
            background-color: rgba(0, 0, 0, 0.75);
            border-radius: 2px;
            font-size: 20px;
            color: #fff;
            text-align: center;
            line-height: 35px;
            margin-left: 3px;
            transition: all 0.25s;
        }
    }
`;
