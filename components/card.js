import { styled } from "goober";
import Image from "next/image";
import { LocationIcon, StarIcon } from "./icons";

export default function Card({ place }) {
    return (
        <>
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
            </Container>
        </>
    );
}

const Container = styled("div")`
    width: 100%;
    height: 500px;
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);

    .fixed {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        padding: 20px;
        color: #fff;
        gap: 30px;
        background-color: rgba(0, 0, 0, 0.75);

        * {
            line-height: 1;
            margin: 0;
        }

        .info {
            display: flex;
            justify-content: space-between;
        }
    }
`;
