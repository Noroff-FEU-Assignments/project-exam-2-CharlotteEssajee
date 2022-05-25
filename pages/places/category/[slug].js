import { styled } from "goober";
import { Heading1 } from "@components/headings";
import Head from "next/head";
import Header from "@components/header/header";
import Standard from "@components/layout";
import {
    getAllCategorySlugs,
    getCathegoryBySlug,
    getPlacesByCategory,
} from "@lib/api";
import Card from "@components/card";
import { useRouter } from "next/router";
import SiteFooter from "@components/footer";
import Image from "next/image";
import Link from "next/link";

export default function Category({ cabins, category }) {
    const router = useRouter();

    return (
        <>
            {router.isFallback ? (
                <span>Loading…</span>
            ) : (
                <>
                    <Header />
                    <Standard>
                        <HeroCategory>
                            <div className="hero-text">
                                <h1>Find your perfect place to relax</h1>
                                <p>
                                    Travel takes us out of our comfort zones and
                                    inspires us to see, taste and try new
                                    things. It constantly challenges us, not
                                    only to adapt to and explore new
                                    surroundings, but also to engage with
                                    different people, to embrace adventures as
                                    they come and to share new and meaningful
                                    experiences with friends and loved ones.
                                </p>
                                <div className="buttons">
                                    <button>
                                        <Link href="/contact">Contact</Link>
                                    </button>
                                    <button>
                                        <Link href="/places">Explore</Link>
                                    </button>
                                </div>
                            </div>
                        </HeroCategory>
                        <div className="reccomended">
                            <h2>{category.name}</h2>
                            <Grid>
                                {cabins.map(({ node }) => {
                                    return <Card key={node.id} place={node} />;
                                })}
                            </Grid>
                        </div>
                    </Standard>
                    <SiteFooter />
                </>
            )}
        </>
    );
}

export async function getStaticProps({ params }) {
    const cabins = await getPlacesByCategory(params.slug);
    const category = await getCathegoryBySlug(params.slug);

    return {
        props: {
            cabins: cabins.edges,
            category,
        },
    };
}

export async function getStaticPaths() {
    const categorySlugs = await getAllCategorySlugs();

    return {
        paths:
            categorySlugs?.map(({ node }) => `/places/category/${node.slug}`) ||
            [],
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

const HeroCategory = styled("div")`
    display: block;

    h1 {
        color: var(--main-brand-color);
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 30px;
            font-weight: 500;
            letter-spacing: 0.02rem;
        }
    }

    p {
        max-width: 600px;
    }

    .buttons {
        margin: 2em 0 4em 0;

        button {
            border-radius: 0px 10px 10px 10px;
            background-color: #397880;
            margin-right: 20px;
            border: none;
            padding: 10px 30px;
            cursor: pointer;

            a {
                text-decoration: none;
                color: white;
            }
        }
    }
`;
