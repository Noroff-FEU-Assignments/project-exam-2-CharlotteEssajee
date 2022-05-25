import { styled } from "goober";
import Image from "next/image";
import { LocationIcon, StarIcon } from "./icons";
import React from "react";
import Link from "next/link";

export default function Card({ place }) {
    return (
        <React.Fragment key={place.title}>
            <Container>
                <Image
                    src={place.featuredImage.node.sourceUrl}
                    alt={place.title}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="fixed">
                    <div className="info">
                        <h3>{place.title}</h3>
                        <span
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <StarIcon size="20px" color="#fff" />
                            {place.placesInfo.rating}
                        </span>
                    </div>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <LocationIcon size="20px" color="#fff" />
                        {place.placesInfo.location}
                    </span>
                </div>
                <Link href={`/places/${place.slug}`} passHref>
                    <a className="cardLink" aria-label={place.title}></a>
                </Link>
            </Container>
        </React.Fragment>
    );
}

const Container = styled("div")`
    width: 100%;
    height: 450px;
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);

    &:hover {
        box-shadow: var(--shadow);
    }

    .fixed {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        padding: 20px;
        color: #fff;
        gap: 20px;
        background-color: rgba(0, 0, 0, 0.6);

        * {
            line-height: 1;
            margin: 0;
        }

        .info {
            display: flex;
            justify-content: space-between;
        }
    }

    .cardLink {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
        text-decoration: none;
        transition: 0.3s; 
    }
`;
