import { styled } from "goober";
import Head from "@components/head";
import Header from "@components/header/header";
import HomeHero from "@components/heroes/homeHero";
import Standard from "@components/layout";
import { getPlacesForHome } from "@lib/api";
import Card from "@components/card";
import ExploreBergen from "@components/exploreBergen";
import SiteFooter from "@components/footer";

export default function Home({ places }) {
    console.log(places);
    return (
        <>
            <Header />
            <Head title="Holidaze - Explore wonderful destinations in Bergen" description="Find your dream destination in Bergen. Beachside, mountains, cabins? We have it all" />
            <HomeHero />
            <Standard>
                <h2>Plan your next trip</h2>
                <Grid>
                    {places.map(({ node }) => {
                        return <Card key={node.id} place={node} />;
                    })}
                </Grid>
                <h2>Explore Bergen</h2>
                <ExploreBergen />
            </Standard>
            <SiteFooter />
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
    margin-bottom: var(--margin-large);

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 568px) {
        grid-template-columns: 100%;
    }
`;
