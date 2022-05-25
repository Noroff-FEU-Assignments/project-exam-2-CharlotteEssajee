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

    return data?.places.edges;
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

export async function getPlaceAndPlaces(slug) {
    const data = await fetchAPI(
        `
        fragment PlaceFields on Place {
            id
            title
            slug
            featuredImage {
                node {
                    sourceUrl
                }
            }
            placesInfo {
                rating
                location
                beds
                baths
                description
                guests
                images {
                    image {
                        id
                        sourceUrl
                    }
                }
            }
        } 

        query PlaceBySlug($id: ID!) {
            place(id: $id, idType: SLUG) {
                ...PlaceFields
            }

            places(first: 4) {
                edges {
                    node {
                        ...PlaceFields
                    }
                }
            }
        }
        `,

        {
            variables: {
                id: slug,
            },
        }
    );

    data.places.edges = data.places.edges.filter(
        ({ node }) => node.slug !== slug
    );

    if (data.places.edges.length > 3) {
        data.places.edges.pop();
    }

    return data;
}

export async function getPlacesByCategory(category) {
    const data = await fetchAPI(
        `
    query getPlacesByCategory($categoryName: String){
        places(where: {categoryName: $categoryName}) {
          edges {
            node {
              id
              slug
              title
              placesInfo {
                rating
                location
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `,
        {
            variables: {
                categoryName: category,
            },
        }
    );

    return data?.places;
}

export async function getThreePlacesByCategory(category) {
    const data = await fetchAPI(
        `
    query getPlacesByCategory($categoryName: String){
        places(where: {categoryName: $categoryName}, first: 3) {
          edges {
            node {
              id
              slug
              title
              placesInfo {
                rating
                location
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `,
        {
            variables: {
                categoryName: category,
            },
        }
    );

    return data?.places;
}

export async function getAllCategorySlugs() {
    const data = await fetchAPI(
        `
    {
        categories {
            edges {
                node {
                    slug
                }
            }
        }
    }
    `
    );

    return data?.categories.edges;
}

export async function getAllCategories() {
    const data = await fetchAPI(
        `
    {
        categories {
            edges {
                node {
                    id
                    databaseId
                    name
                    slug
                }
            }
        }
    }
    `
    );

    return data?.categories.edges;
}

export async function getCathegoryBySlug(slug) {
    const data = await fetchAPI(
        `
        query categoryBySlug($id: ID!) {
            category(id: $id, idType: SLUG) {
              name
              description
            }
          }
        `,

        {
            variables: {
                id: slug,
            },
        }
    );

    return data?.category;
}

export async function searchPlaces(query) {
    const data = await fetchAPI(
        `
    query searchPlaces($query: String!) {
        places(where: {search: $query}) {
            edges {
                node {
                    id
                    title
                    slug
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                    placesInfo {
                        rating
                        location
                    }
                }
            }
        }
    }
    `,
        {
            variables: {
                query: query,
            },
        }
    );
    return data?.places.edges;
}
