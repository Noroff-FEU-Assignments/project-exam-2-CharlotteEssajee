import { styled } from "goober";
import { useEffect, useState, useCallback } from "react";
import { searchPlaces } from "@lib/api";
import SmallCard from "@components/smallCard";
import { SearchIcon } from "@components/icons";
import state from "@context/state";
import actions from "@context/actions";
import { view } from "@risingstack/react-easy-state";

const SearchModal = () => {
    const { searchModalOpen } = state;
    const { setSearchModalOpen } = actions;
    const [query, setQuery] = useState();
    const [result, setResult] = useState(null);

    const handleKeyPress = useCallback(
        (event) => {
            if (event.metaKey && event.key === "k") {
                setResult(null);
                window.scrollTo({ top: 0 });
                setSearchModalOpen(!searchModalOpen);
            }
            if (event.key === "Escape") {
                setResult(null);
                setSearchModalOpen(false);
            }
        },
        [setSearchModalOpen, searchModalOpen]
    );

    function handleClick() {
        setResult(null);
        window.scrollTo({ top: 0 });
        setSearchModalOpen(!searchModalOpen);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => {
        if (query !== "") {
            const delay = setTimeout(() => {
                searchPlaces(query).then((res) => {
                    setResult(res);
                });
            }, 1000);
            return () => clearTimeout(delay);
        } else {
            setResult(null);
        }
    }, [query, setResult]);

    return (
        <>
            {searchModalOpen && (
                <div>
                    <Container>
                        <SearchWrapper>
                            <input
                                type="search"
                                placeholder="search..."
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                            {result && (
                                <div className="results">
                                    {result.length > 0 &&
                                        result.map(({ node }) => {
                                            return (
                                                <SmallCard
                                                    key={node.id}
                                                    place={node}
                                                />
                                            );
                                        })}
                                    {result.length === 0 && (
                                        <span style={{ color: "#000" }}>
                                            No results
                                        </span>
                                    )}
                                </div>
                            )}
                        </SearchWrapper>
                    </Container>
                    <Overlay onClick={handleClick} />
                </div>
            )}
        </>
    );
};

export default view(SearchModal);

const Container = styled("div")`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    top: 0;
    left: 0;

    @media (max-width: 768px) {
        height: auto;
        min-height: 100%;
    }
`;

const SearchWrapper = styled("div")`
    width: 100%;
    max-width: 800px;
    padding-top: 201px;
    z-index: 999;
    position: relative;

    input {
        width: 100%;
        padding: 15px;
        font-size: 20px;
    }

    .results {
        background-color: #fff;
        padding: 30px;
        height: 100%;
        max-height: 390px;
        overflow-y: auto;
        border-radius: var(--border-radius);
        margin-top: 15px;
    }
`;

const Overlay = styled("div")`
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
`;
