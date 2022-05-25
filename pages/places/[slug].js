import { styled } from "goober";
import { Heading1 } from "@components/headings";
import Head from "components/head";
import Header from "@components/header/header";
import Image from "next/image";
import Standard from "@components/layout";
import { getAllPlaceSlugs, getPlaceAndPlaces } from "@lib/api";
import Card from "@components/card";
import { useRouter } from "next/router";
import SiteFooter from "@components/footer";
import { useState, useEffect } from "react";
import BookingForm from "@components/bookingForm";
import BookingModal from "@components/bookingModal";
import {
    BathroomIcon,
    CarIcon,
    KeyIcon,
    PawIcon,
    WifiIcon,
    WindIcon,
} from "@components/icons";
import Slider from "@components/imageSlider";

export default function Place({ cabin, cabins }) {
    const router = useRouter();
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [people, setPeople] = useState("");

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal) {
            document.querySelector("body").classList.add("modal-open");
        } else {
            document.querySelector("body").classList.remove("modal-open");
        }
    });

    return (
        <>
            {router.isFallback ? (
                <span>Loading…</span>
            ) : (
                <>
                    <Header />
                    <Head title="Holidaze" />
                    <Standard>
                        <DetailImage>
                            <Slider featured={cabin.featuredImage.node} images={cabin.placesInfo.images} />
                        </DetailImage>

                        <BookingForm
                            checkin={checkin}
                            checkout={checkout}
                            people={people}
                            setCheckin={setCheckin}
                            setCheckout={setCheckout}
                            setPeople={setPeople}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />

                        <h2>{cabin.title}</h2>

                        <Info>
                            <small>Guests: {cabin.placesInfo.guests}</small>
                            <small>Beds: {cabin.placesInfo.beds}</small>
                            <small>Baths: {cabin.placesInfo.baths}</small>
                        </Info>

                        <Description>
                            <h2>Superhost</h2>
                            {cabin.placesInfo.description && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: cabin.placesInfo.description,
                                    }}
                                />
                            )}
                        </Description>

                        <Facilities>
                            <h2>Facilities</h2>
                            <div className="facilities">
                                <div className="icons">
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                        }}
                                    >
                                        <BathroomIcon
                                            size="25px"
                                            color="#333"
                                        />
                                        Bathroom
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                        }}
                                    >
                                        <WindIcon size="25px" color="#333" />
                                        Aircondition
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                        }}
                                    >
                                        <WifiIcon size="25px" color="#333" />
                                        Wireless Internet
                                    </span>
                                </div>
                                <div className="icons">
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                        }}
                                    >
                                        <KeyIcon size="25px" color="#333" />
                                        Keyless check in
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                        }}
                                    >
                                        <CarIcon size="25px" color="#333" />
                                        Free parking
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                        }}
                                    >
                                        <PawIcon size="25px" color="#333" />
                                        Pets allowed
                                    </span>
                                </div>
                            </div>
                        </Facilities>

                        <div className="explore">
                            <h2>Explore similar places</h2>
                            <Grid>
                                {cabins.edges.map(({ node }) => {
                                    return <Card key={node.id} place={node} />;
                                })}
                            </Grid>
                        </div>
                    </Standard>
                    <SiteFooter />
                    {showModal && (
                        <>
                            <BookingModal
                                checkin={checkin}
                                checkout={checkout}
                                people={people}
                                setShowModal={setShowModal}
                                image={cabin.featuredImage.node.sourceUrl}
                                title={cabin.title}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
}

export async function getStaticProps({ params }) {
    const data = await getPlaceAndPlaces(params.slug);

    return {
        props: {
            cabin: data.place,
            cabins: data.places,
        },
    };
}

export async function getStaticPaths() {
    const places = await getAllPlaceSlugs();

    return {
        paths: places?.map(({ node }) => `/places/${node.slug}`) || [],
        fallback: true,
    };
}

const Grid = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 568px) {
        grid-template-columns: 100%;
    }
`;

const DetailImage = styled("div")`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;

    @media (max-width: 568px) {
        grid-template-columns: 1fr;

        .exterior-img {
            height: 300px !important;
        }

        .interior-img {
            display: flex;
            gap: 20px;
            flex-direction: row;
        }
    }

    img {
        border-radius: 0px 20px 20px 20px;
    }
`;

const Info = styled("div")`
    display: flex;

    small {
        margin-right: 20px;
    }
`;

const Description = styled("div")`
    max-width: 600px;
`;

const Facilities = styled("div")`
    .facilities {
        max-width: 600px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .icons span {
        margin-bottom: 15px;
    }

    @media (max-width: 500px) {
        .facilities {
            grid-template-columns: 1fr;
        }

        .icons span {
            margin-bottom: 20px;
        }
    }
`;
