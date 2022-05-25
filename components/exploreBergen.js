import { styled } from "goober";
import Image from "next/image";

export default function ExploreBergen() {
    return (
        <>
            <Explore>
                <ExploreCard>
                    <div
                        style={{
                            width: "100%",
                            height: "350px",
                            position: "relative",
                        }}
                    >
                        <Image
                            className="exploreimg"
                            alt="Mountains"
                            src="/images/lovstakken.jpg"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <h4>Bergen seven mountain hike</h4>
                    <p>
                        Bergen is the second largest city in Norway. It is known
                        for its 7 surrounding mountains and it is the best
                        location to visit the fjords in the country. In fact,
                        there are more mountains around the city, and many of
                        them are on the same massif. The mountains offer
                        outstanding views of the city and its stunning setting,
                        as well as an extensive network of hiking trails for
                        various levels of physical fitness.
                    </p>
                    <a href="https://www.google.com">Read more</a>
                </ExploreCard>
                <ExploreCards>
                    <div className="explore-section">
                        <div
                            style={{
                                width: "120px",
                                height: "150px",
                                position: "relative",
                            }}
                        >
                            <Image
                                className="exploreimg"
                                alt="Salmon with egg"
                                src="/images/salmon.jpg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="explore-text">
                            <h4>Seefood</h4>
                            <a href="https://www.google.com">Read more</a>
                        </div>
                    </div>
                    <div className="explore-section">
                        <div
                            style={{
                                width: "120px",
                                height: "150px",
                                position: "relative",
                            }}
                        >
                            <Image
                                className="exploreimg"
                                alt="Wine barrels on brown wooden floor"
                                src="/images/wine.jpg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="explore-text">
                            <h4>Wine</h4>
                            <a href="https://www.google.com">Read more</a>
                        </div>
                    </div>
                    <div className="explore-section">
                        <div
                            style={{
                                width: "120px",
                                height: "150px",
                                position: "relative",
                            }}
                        >
                            <Image
                                className="exploreimg"
                                alt="Penguin at Bergen Aquarium"
                                src="/images/aquarium.jpg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="explore-text">
                            <h4>Aquarium</h4>
                            <a href="https://www.google.com">Read more</a>
                        </div>
                    </div>
                </ExploreCards>
            </Explore>
        </>
    );
}

const Explore = styled("div")`
    display: grid;
    grid-template-columns: 5fr 2fr;
    gap: 70px;

    @media (max-width: 1200px) {
        grid-template-columns: 3fr 2fr;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 568px) {
        grid-template-columns: 1fr;
    }
`;

const ExploreCard = styled("div")`
    .exploreimg {
        border-radius: var(--border-radius);
    }

    h4 {
        font-size: 25px;
        margin: var(--margin-small) 0;
        font-weight: 500;
    }

    p {
        margin-bottom: var(--margin-small);
    }

    a {
        text-decoration: none;
        color: var(--main-brand-color);
    }
`;

const ExploreCards = styled("div")`
    width: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 568px) {
        flex-direction: row;
        justify-content: space-around;
    }

    .exploreimg {
        border-radius: var(--border-radius);
    }

    .explore-section {
        display: flex;
        padding-bottom: 30px;
        align-items: center;

        @media (max-width: 568px) {
            display: inline;
        }
    }

    h4 {
        font-size: 18px;
        margin: var(--margin-small) 0;
        font-weight: 500;
    }

    .explore-text {
        margin-left: 10px;

        a {
            text-decoration: none;
            color: var(--main-brand-color);
        }
    }
`;
