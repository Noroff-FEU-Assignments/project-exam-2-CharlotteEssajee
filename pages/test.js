import { styled } from "goober";
import Head from "next/head";
import Header from "@components/header/header";
import HomeHero from "@components/heroes/homeHero";
import Standard from "@components/layout";
import { createPost } from "@lib/rest";
import Card from "@components/card";
import ExploreBergen from "@components/exploreBergen";
import SiteFooter from "@components/footer";

export default function Home({}) {
    function handleClick() {
        createPost();
    }
    return (
        <>
            <button onClick={handleClick}>Create post</button>
        </>
    );
}
