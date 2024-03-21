const BASE_URL = `http://j10c205.p.ssafy.io:9002/api/v1/member`;

export const getAuthToken = async (
  oAuthDomain: "kakao" | "naver",
  code: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/${oAuthDomain}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching auth token", error);
  }
};
