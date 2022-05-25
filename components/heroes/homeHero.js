import { styled } from "goober";
import Image from "next/image";

export default function HomeHero() {
    return (
        <>
            <HeroContainer>
                <__inner>
                    <Image
                        src="/images/heroimage.jpg"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className="fixed">
                        <h1>
                            Explore wonderful <br /> destinations in Bergen
                        </h1>
                        <p>
                            Find your dream destination in Bergen.{" "}
                            <br className="hide-mobile" /> Beachside, mountains,
                            cabins? We have it all
                        </p>
                    </div>
                </__inner>
            </HeroContainer>
        </>
    );
}

const __inner = styled("div")`
    width: 100%;
    max-width: 1200px;
    border-radius: var(--border-radius);
    overflow: hidden;
    position: relative;
    height: 500px;
    max-height: calc(100vh - 67.5px - 33.75px);
    min-height: 400px;

    img {
        filter: brightness(65%);
    }

    .fixed {
        position: absolute;
        top: 0;
        bottom: 30px;
        left: 30px;
        right: 30px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 15px;

        h1 {
            line-height: 1.25;
            margin: 0;
        }
    }

    @media (max-width: 768px) {
        min-height: auto;
        max-height: auto;
        height: 400px;

        h1 {
            font-size: 30px;
            font-weight: 500;
            letter-spacing: 0.02rem;
        }
    }
`;

const HeroContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    width: 100%;
`;
