const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

const userId = 93040956;
const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ATHLETES_ENDPOINT = `https://www.strava.com/api/v3/athletes/${userId}`;
const ACTIVITY_ENDPOINT = "https://www.strava.com/api/v3/";

const getAccessToken = async () => {
    const body = JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
    });

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body,
    });

    return response.json();
};

export const getActivities = async (per_page: number = 30) => {
    const { access_token: accessToken } = await getAccessToken();
    const response = await fetch(
        `${ATHLETES_ENDPOINT}/activities?per_page=${per_page}&access_token=${accessToken}`
    );
    const data = await response.json();

    const publicActivities = data.filter(
        (activity: any) => activity.visibility === "everyone"
    );

    return publicActivities;
};

export const getActivity = async (id: number) => {
    const { access_token: accessToken } = await getAccessToken();
    const response = await fetch(
        `${ACTIVITY_ENDPOINT}/activities/${id}?access_token=${accessToken}`
    );
    const json = await response.json();
    return json;
};

export const getAthlete = async () => {
    const { access_token: accessToken } = await getAccessToken();
    const res = await fetch(
        `${ACTIVITY_ENDPOINT}/athlete?access_token=${accessToken}`
    );
    const json = await res.json();
    return json;
};

export const getGear = async (id: number) => {
    const { access_token: accessToken } = await getAccessToken();
    const res = await fetch(
        `${ACTIVITY_ENDPOINT}/gear/${id}?access_token=${accessToken}`
    );
    const json = await res.json();
    return json;
};

export const getAthleteStats = async (userId: number) => {
    const { access_token: accessToken } = await getAccessToken();
    const res = await fetch(
        `${ACTIVITY_ENDPOINT}/athletes/${userId}/stats?access_token=${accessToken}`
    );
    const json = await res.json();
    return json;
};
