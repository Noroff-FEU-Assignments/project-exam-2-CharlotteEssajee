import { styled } from "goober";
import { Heading1 } from "@components/Headings";
import Head from "next/head";
import Header from "@components/header/header";
import HomeHero from "@components/homeHero";
import Standard from "@components/layout";
import { getPlacesForHome } from "@lib/api";
import Card from "@components/card";

export default function Home({ places }) {
    console.log(places);
    return (
        <>
            <Header />
            <HomeHero />
            <Standard>
                <Grid>
                    {places.map(({ node }) => {
                        return <Card place={node} />;
                    })}
                </Grid>
            </Standard>
        </>
    );
}

export async function getStaticProps() {
    const places = await getPlacesForHome();

    return {
        props: {
            places: places.edges,
        },
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
