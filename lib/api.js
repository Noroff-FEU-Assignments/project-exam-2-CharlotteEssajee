const API_URL = "https://ce.accelr.dev/graphql";

async function fetchAPI(query, { variables } = {}) {
    const headers = {
        "Content-Type": "application/json",
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await res.json();

    return json.data;
}

export async function getAllPlaceSlugs() {
    const data = await fetchAPI(`
        {
            places(first: 1000) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `);

    return data?.places;
}

export async function getPlacesForHome() {
    const data = await fetchAPI(`
        {
            places(first: 3) {
                edges {
                    node {
                        title 
                        slug
                        id
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                        placesInfo {
                            location
                            rating
                        }
                    }
                }
            }
        }
    `);

    return data?.places;
}
