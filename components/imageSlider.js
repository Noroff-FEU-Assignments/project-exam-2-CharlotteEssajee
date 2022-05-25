import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { styled } from "goober";

function ThumbnailPlugin(mainRef) {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active");
            });
        }
        function addActive(idx) {
            slider.slides[idx].classList.add("active");
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx);
                });
            });
        }

        slider.on("created", () => {
            if (!mainRef.current) return;
            addActive(slider.track.details.rel);
            addClickEvents();
            mainRef.current.on("animationStarted", (main) => {
                removeActive();
                const next = main.animator.targetIdx || 0;
                addActive(main.track.absToRel(next));
                slider.moveToIdx(next);
            });
        });
    };
}

export default function Slider({ featured, images }) {
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
    });
    const [thumbnailRef] = useKeenSlider(
        {
            initial: 0,
            slides: {
                perView: 6,
                spacing: 15,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    );

    return (
        <Container>
            <div ref={sliderRef} className="keen-slider">
                <div className="keen-slider__slide sliderImage">
                    <Image
                        src={featured.sourceUrl}
                        alt="Galleri bilde"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                {images &&
                    images.map(({image}) => {
                        return (
                            <div
                                className="keen-slider__slide sliderImage"
                                key={image.id}
                            >
                                <Image
                                    src={image.sourceUrl}
                                    alt="Galleri bilde"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        );
                    })}
            </div>

            <div ref={thumbnailRef} className="keen-slider thumbnail">
                <div className="keen-slider__slide thumbnailImage">
                    <Image
                        src={featured.sourceUrl}
                        alt="Thumbnail"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                {images &&
                    images.map(({image}) => {
                        return (
                            <div
                                className="keen-slider__slide thumbnailImage"
                                key={image.id}
                            >
                                <Image
                                    src={image.sourceUrl}
                                    alt="Thumbnail"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        );
                    })}
            </div>
        </Container>
    );
}

const Container = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow: hidden;

    .sliderImage {
        height: 500px;
        width: 100%;
    }

    .thumbnailImage {
        height: 75px;
    }
    img {
        border-radius: var(--border-radius);
    }
`;
