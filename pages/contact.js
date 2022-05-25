import Header from "@components/header/header";
import Standard from "@components/layout";
import ContactForm from "@components/forms/contactForm";
import SiteFooter from "@components/footer";
import { styled } from "goober";
import Head from "@components/head";

export default function Contact() {
    return (
        <>
            <Header />
            <Head title="Holidaze - Contact us" description="Contact us! +47 123 45 678 | post@holidaze.com | Holidaze town, 5600. Bergen, Norway"/>
            <Standard>
                <div className="container">
                    <Grid>
                        <div className="content">
                            <h2>Contact</h2>
                            <a href="tel:12345678">+47 123 45 678</a>
                            <a href="mailto:post@holidaze.com">
                                post@holidaze.com
                            </a>
                            <p>
                                Holidaze town, <br /> 5600 Bergen, Norway
                            </p>
                        </div>
                        <ContactForm />¨
                    </Grid>
                </div>
            </Standard>

            <SiteFooter />
        </>
    );
}

const Grid = styled("div")`
    display: grid;
    grid-template-columns: 30% auto;
    gap: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 100%;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 5px;

        h1 {
            line-height: 1;
            margin: 0;
            margin-bottom: 15px;
        }
    }
`;
