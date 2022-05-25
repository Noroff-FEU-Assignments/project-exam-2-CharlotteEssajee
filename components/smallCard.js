import { styled } from "goober";
import Image from "next/image";
import { LocationIcon, StarIcon } from "./icons";
import Link from "next/link";

export default function SmallCard({ place }) {
    return (
        <>
            <Container>
                <div className="smallImage">
                    <Image
                        src={place.featuredImage.node.sourceUrl}
                        alt={place.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="info">
                    <h3>{place.title}</h3>
                    <div className="placeInfo">
                        <span
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "14px"
                            }}
                        >
                            <StarIcon size="20px" color="#000" />
                            {place.placesInfo.rating}
                        </span>
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "14px"
                            }}
                        >
                            <LocationIcon size="20px" color="#000" />
                            {place.placesInfo.location}
                        </span>
                    </div>
                </div>
                <Link href={`/places/${place.slug}`} passHref>
                    <a className="cardLink" aria-label={place.title}></a>
                </Link>
            </Container>
        </>
    );
}

const Container = styled("div")`
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    .smallImage {
        position: relative;
        height: 100px;
        width: 75px;

        img {
            border-radius: var(--border-radius-smaller);
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
    }

    .placeInfo {
        display: flex;
        flex-direction: row;
        gap: 10px;
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
    }
`;
