import { styled } from "goober";
import { Heading1 } from "@components/headings";
import Head from "components/head";
import Header from "@components/header/header";
import PlacesHero from "@components/heroes/placesHero";
import Standard from "@components/layout";
import { getThreePlacesByCategory } from "@lib/api";
import Card from "@components/card";
import Link from "next/link";
import SiteFooter from "@components/footer";

export default function Home({ reccomended, cabin, beachHouse }) {
    return (
        <>
            <Header />
            <Head title="Holidaze - Where to travel next?" description="Find your dream destination in Bergen. Beachside, mountains, cabins? We have it all"/>
            <PlacesHero />
            <Standard>
                <div className="reccomended">
                    <CategoryHeader>
                        <h2>Reccomended stays</h2>
                        <Link href="/places/category/reccomended">
                            View all
                        </Link>
                    </CategoryHeader>
                    <Grid>
                        {reccomended.map(({ node }) => {
                            return <Card key={node.id} place={node} />;
                        })}
                    </Grid>
                </div>

                <div className="cabins">
                    <CategoryHeader>
                        <h2>Cabins</h2>
                        <Link href="/places/category/cabin">View all</Link>
                    </CategoryHeader>
                    <Grid>
                        {cabin.map(({ node }) => {
                            return <Card key={node.id} place={node} />;
                        })}
                    </Grid>
                </div>

                <div className="beach-houses">
                    <CategoryHeader>
                        <h2>Beach Houses</h2>
                        <Link href="/places/category/beach-house">
                            View all
                        </Link>
                    </CategoryHeader>
                    <Grid>
                        {beachHouse.map(({ node }) => {
                            return <Card key={node.id} place={node} />;
                        })}
                    </Grid>
                </div>
            </Standard>
            <SiteFooter />
        </>
    );
}

export async function getStaticProps() {
    const reccomended = await getThreePlacesByCategory("reccomended");
    const cabin = await getThreePlacesByCategory("cabin");
    const beachHouse = await getThreePlacesByCategory("beach-house");

    return {
        props: {
            reccomended: reccomended.edges,
            cabin: cabin.edges,
            beachHouse: beachHouse.edges,
        },
    };
}

const CategoryHeader = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;

    a {
        text-decoration: none;
        color: var(--main-brand-color);
    }
`;

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
