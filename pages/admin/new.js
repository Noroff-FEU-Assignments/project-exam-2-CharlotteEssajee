import { styled } from "goober";
import Header from "@components/header/header";
import { createPlace, getEnquiries, uploadImage } from "@lib/rest";
import state from "@context/state";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAllCategories } from "@lib/api";
import { Loading, Done } from "@components/lottie";
import Footer from "@components/footer";
import Notif from "@components/forms/notif";
import Head from "@components/head";
import Standard from "@components/layout";

export default function Enquiries({ categories }) {
    const [mounted, setMounted] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState("");
    const [beds, setBeds] = useState("");
    const [baths, setBaths] = useState("");
    const [rating, setRating] = useState("");
    const [category, setCategory] = useState("");
    const [featuredImageId, setFeatureImageId] = useState("");
    const [featuredImageUrl, setFeatureImageUrl] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [imageIds, setImageIds] = useState([]);
    const imgUpload = useRef(null);
    var galleryUpload = useRef(null);
    const [uploaded, setUploaded] = useState(false);
    const [featuredLoading, setFeaturedLoading] = useState(false);
    const [galleryLoading, setGalleryLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [notif, setNotif] = useState(false);
    const { isAdmin } = state;

    useEffect(() => setMounted(true), []);

    async function handleFeatured() {
        if (imgUpload.current.files.length > 0) {
            setFeaturedLoading(true);
            let formData = new FormData();
            let file = imgUpload.current.files[0];
            console.log(file);
            formData.append("file", file);
            formData.append("title", file.name);
            var res = await uploadImage(formData, file.name);

            setFeatureImageId(res?.id);
            setFeatureImageUrl(res?.source_url);
            setUploaded(true);
            setFeaturedLoading(false);
        }
    }

    async function handleGallery() {
        if (galleryUpload.current.files.length > 0) {
            setGalleryLoading(true);
            let formData = new FormData();
            let file = galleryUpload.current.files[0];
            console.log(file);
            formData.append("file", file);
            formData.append("title", file.name);
            var res = await uploadImage(formData, file.name);

            imageIds.push({ image: res?.id });
            //imageUrls.push({ url: res?.source_url });
            var newImages = imageUrls.slice();
            newImages.push({ url: res?.source_url, id: res?.id });
            setImageUrls(newImages);
            setGalleryLoading(false);
        }
    }

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        var data = JSON.stringify({
            title: title,
            status: "publish",
            categories: category,
            featured_media: featuredImageId,
            acf: {
                description: description,
                location: location,
                guests: guests,
                beds: beds,
                baths: baths,
                rating: rating,
                images: imageIds,
            },
        });
        var res = await createPlace(data);

        if (res.id) {
            setLoading(false);
            setNotif(true);
            setTitle("");
            setDesc("");
            setLocation("");
            setGuests("");
            setBeds("");
            setBaths("");
            setRating("");
            setCategory("");
            setFeatureImageId("");
            setFeatureImageUrl("");
            setImageUrls([]);
            setImageIds([]);

            setTimeout(() => {
                setNotif(false);
            }, 5000);
        } else {
            setLoading(false);
            setError("Something went wrong");
            setNotif(true);

            setTimeout(() => {
                setNotif(false);
            }, 5000);
        }
    }

    if (!mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Add new hotel" />
                <Standard>
                    <Container>Loading...</Container>
                </Standard>
            </>
        );
    }

    if (!isAdmin && mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Add new hotel" />
                <Standard>
                    <Container>
                        <h2>You have to be logged in to view this page.</h2>
                        <button>
                            <Link href="/admin/login">Go to login</Link>
                        </button>
                    </Container>
                </Standard>
            </>
        );
    }

    if (isAdmin && mounted) {
        return (
            <>
                <Header />
                <Head title="Holidaze - Add new hotel" />
                <Standard>
                    <Container>
                        <h2>Add new hotel</h2>

                        <Wrapper>
                            <Form onSubmit={submit}>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        id="title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label
                                        htmlFor="title"
                                        className={title && "filled"}
                                    >
                                        Title
                                    </label>
                                </div>

                                <div className="input-field">
                                    <textarea
                                        type="text"
                                        id="description"
                                        required
                                        value={description}
                                        onChange={(e) => setDesc(e.target.value)}
                                        rows="5"
                                    />
                                    <label
                                        htmlFor="description"
                                        className={description && "filled"}
                                    >
                                        Description
                                    </label>
                                </div>

                                <div className="grid">
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            id="location"
                                            required
                                            value={location}
                                            onChange={(e) =>
                                                setLocation(e.target.value)
                                            }
                                        />
                                        <label
                                            htmlFor="location"
                                            className={location && "filled"}
                                        >
                                            Location
                                        </label>
                                    </div>

                                    <div className="input-field">
                                        <input
                                            type="number"
                                            id="guests"
                                            required
                                            value={guests}
                                            onChange={(e) =>
                                                setGuests(e.target.value)
                                            }
                                        />
                                        <label
                                            htmlFor="guests"
                                            className={guests && "filled"}
                                        >
                                            Guests
                                        </label>
                                    </div>

                                    <div className="input-field">
                                        <input
                                            type="number"
                                            id="beds"
                                            required
                                            value={beds}
                                            onChange={(e) =>
                                                setBeds(e.target.value)
                                            }
                                        />
                                        <label
                                            htmlFor="beds"
                                            className={beds && "filled"}
                                        >
                                            Beds
                                        </label>
                                    </div>
                                </div>

                                <div className="grid">
                                    <div className="input-field">
                                        <input
                                            type="number"
                                            id="baths"
                                            required
                                            value={baths}
                                            onChange={(e) =>
                                                setBaths(e.target.value)
                                            }
                                        />
                                        <label
                                            htmlFor="baths"
                                            className={baths && "filled"}
                                        >
                                            Baths
                                        </label>
                                    </div>

                                    <div className="input-field">
                                        <input
                                            type="number"
                                            id="rating"
                                            required
                                            value={rating}
                                            onChange={(e) =>
                                                setRating(e.target.value)
                                            }
                                        />
                                        <label
                                            htmlFor="rating"
                                            className={rating && "filled"}
                                        >
                                            Rating
                                        </label>
                                    </div>

                                    <div className="select-container">
                                        <select
                                            type="dropdown"
                                            id="category"
                                            value={category}
                                            onChange={(e) => {
                                                setCategory(e.target.value);
                                            }}
                                        >
                                            <option>---</option>
                                            {categories.map(({ node }) => {
                                                return (
                                                    <option
                                                        key={node.id}
                                                        value={node.databaseId}
                                                    >
                                                        {node.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <label
                                            className={category && "filled"}
                                            htmlFor="category"
                                        >
                                            Category
                                        </label>
                                    </div>
                                </div>

                                <div className="grid">
                                    <Div>
                                        {featuredImageUrl ? (
                                            <img
                                                src={featuredImageUrl}
                                                alt="upload image"
                                                className="featured-image"
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    height: "250px",
                                                    width: "100%",
                                                }}
                                            ></div>
                                        )}
                                        <input
                                            type="file"
                                            id="single"
                                            accept="image/*"
                                            ref={imgUpload}
                                            onChange={handleFeatured}
                                        />
                                        <label
                                            className="button primary block"
                                            htmlFor="single"
                                        ></label>
                                        {!uploaded && (
                                            <span className="label">
                                                Featured image
                                            </span>
                                        )}
                                        {featuredLoading && (
                                            <div className="galleryLoading">
                                                <Loading />
                                            </div>
                                        )}
                                    </Div>

                                    <Div>
                                        <input
                                            type="file"
                                            id="gallery"
                                            accept="image/*"
                                            ref={galleryUpload}
                                            onChange={handleGallery}
                                        />
                                        <label
                                            className="button primary block"
                                            htmlFor="gallery"
                                        ></label>
                                        <span className="label">
                                            Add gallery image
                                        </span>
                                        {galleryLoading && (
                                            <div className="galleryLoading">
                                                <Loading />
                                            </div>
                                        )}
                                    </Div>
                                    {imageUrls.length !== 0 && (
                                        <div className="galleryImages">
                                            {imageUrls.map((image) => {
                                                return (
                                                    <img
                                                        key={image.id}
                                                        src={image.url}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <button className="submit-btn" type="submit">
                                        Create place
                                    </button>
                                </div>
                            </Form>
                            {loading && (
                                <div className="galleryLoading">
                                    <Loading />
                                </div>
                            )}
                        </Wrapper>
                    </Container>
                </Standard>
                <Footer />
                {!error && notif && (
                    <Notif
                        notif={notif}
                        setNotif={setNotif}
                        text="Place created successfully."
                    />
                )}
                {error && notif && (
                    <Notif notif={notif} setNotif={setNotif} text={error} />
                )}
            </>
        );
    }
}

export async function getServerSideProps() {
    const categories = await getAllCategories();

    return {
        props: {
            categories,
        },
    };
}

const Wrapper = styled("div")`
    position: relative;
    grid-column: span 2;

    .galleryLoading {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        border-radius: var(--border-radius);

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Container = styled("div")`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 30px;
    border-radius: var(--border-radius);
    border: 1px solid #eee;
    box-shadow: var(--shadow);

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;

    h2 {
        grid-column: span 2;
        margin: 0;
    }

    .featuredImage {
        border-radius: var(--border-radius);
        padding: 15px;
        background-color: #f8f8f8;

        img {
            border-radius: var(--border-radius);
        }
    }

    .galleryImages {
        background-color: #f8f8f8;
        padding: 24px 16px;
        border-radius: var(--border-radius);
        margin-bottom: 24px;
        width: auto;

        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        img {
            max-width: 100px;
            height: 100px;
            object-fit: contain;
            background-color: #fff;
            border-radius: var(--border-radius);
        }
    }
`;

const Card = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border-radius: var(--border-radius);
    background-color: #f8f8f8;

    * {
        margin: 0;
    }
`;

const Form = styled("form")`
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;

        @media (max-width: 830px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    .input-field {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .input-field input {
        height: 64px;
        border-radius: var(--border-radius);
        border: none;
        padding: 24px 16px 4px 16px;
        font-size: 16px;
        line-height: 1;
        outline: none;
        box-shadow: none;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        background-color: #f6f6f6;
    }

    .input-field label {
        position: absolute;
        pointer-events: none;
        transform: translate(0, 23px) scale(1);
        transform-origin: top left;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        color: var(--label);
        font-size: 16px;
        line-height: 1;
        left: 16px;
    }

    .input-field textarea {
        border-radius: var(--border-radius);
        border: none;
        padding: 32px 16px 4px 16px;
        font-size: 16px;
        line-height: 1;
        outline: none;
        box-shadow: none;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        background-color: #f6f6f6;
    }

    .input-field .filled {
        transform: translate(0, 12px) scale(0.8);
    }

    .input-field:focus-within label {
        transform: translate(0, 12px) scale(0.8);
        color: var(--label-focus);
    }

    .select-container {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .select-container:focus-within label {
        color: var(--label-focus);
    }

    .select-container label {
        position: absolute;
        pointer-events: none;
        transform: translate(0, 12px) scale(0.8);
        transform-origin: top left;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        color: var(--label);
        font-size: 16px;
        line-height: 1;
        left: 16px;
    }

    .select-container select {
        height: 64px;
        border-radius: var(--border-radius);
        border: none;
        padding: 24px 16px 4px 16px;
        font-size: 16px;
        line-height: 2;
        outline: none;
        box-shadow: none;
        transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        background-color: #f6f6f6;
        -moz-appearance: none;
        appearance: none;
        text-overflow: unset;
        color: var(--text);
        cursor: pointer;
    }

    .select-container select:focus {
        box-shadow: 0 0 0 2px var(--input-focus);
    }

    .submit-btn {
        border-radius: var(--border-radius);
        padding: 20px 50px;
        border: none;
        background-color: var(--main-brand-color);
        box-shadow: var(--shadow);
        color: #fff;
        cursor: pointer;
        width: 100%;
    }
`;

const Div = styled("div")`
    position: relative;
    background-color: #f8f8f8;
    padding: 24px 16px;
    border-radius: var(--border-radius);
    margin-bottom: 24px;
    width: auto;
    .featured-image {
        height: auto;
        width: 100%;
        object-fit: cover;
        z-index: 1;
        border-radius: var(--border-radius);
    }
    input {
        visibility: hidden;
        position: absolute;
    }
    label {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        z-index: 2;
    }
    .label {
        position: absolute;
        top: 50%;
        left: 50%;
        white-space: nowrap;
        transform: translate(-50%, -50%) scale(0.8);
        z-index: 0;
    }

    .galleryLoading {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        border-radius: var(--border-radius);

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
