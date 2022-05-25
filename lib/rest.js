const API_URL = "https://ce.accelr.dev/wp-json";

async function getAPI(path) {
    const headers = {
        "Content-Type": "application/json",
    };
    const res = await fetch(API_URL + path, {
        method: "GET",
        headers,
    });

    const json = await res.json();

    return json;
}

async function postAPI(path, data) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.sessionStorage.getItem("jwtToken")}`,
    };
    const res = await fetch(API_URL + path, {
        method: "POST",
        headers,
        body: data,
    });

    const json = await res.json();

    return json;
}

async function uploadAPI(path, data, filename) {
    const headers = {
        Authorization: `Bearer ${window.sessionStorage.getItem("jwtToken")}`,
        "Content-Disposition": 'form-data; filename="' + filename + '"',
    };
    const res = await fetch(API_URL + path, {
        method: "POST",
        headers,
        body: data,
    });

    const json = await res.json();

    return json;
}

async function loginAPI(path, data) {
    const headers = {
        "Content-Type": "application/json",
    };
    const res = await fetch(API_URL + path, {
        method: "POST",
        headers,
        body: data,
    });

    const json = await res.json();

    return json;
}

export async function login(info) {
    const data = await loginAPI("/jwt-auth/v1/token", info);

    return data;
}

export async function createInquiry(postData) {
    const data = await postAPI("/wp/v2/enquiries", postData);

    return data;
}

export async function getEnquiries() {
    const data = await getAPI("/wp/v2/enquiries");

    return data;
}

export async function createPlace(postData) {
    const data = await postAPI("/wp/v2/places", postData);

    return data;
}

export async function uploadImage(postData, filename) {
    const data = await uploadAPI("/wp/v2/media", postData, filename);

    return data;
}

export async function createMessage(postData) {
    const data = await postAPI("/wp/v2/messages", postData);

    return data;
}

export async function getMessages() {
    const data = await getAPI("/wp/v2/messages");

    return data;
}
