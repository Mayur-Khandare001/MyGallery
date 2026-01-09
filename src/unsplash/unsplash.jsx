import { createApi } from "unsplash-js";

const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const VITE_UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Create the API client once and reuse it
const unsplash = createApi({
  accessKey: VITE_UNSPLASH_ACCESS_KEY,
});

export const fetchImages = async (page = 1) => {
  try {
    const result = await unsplash.search.getPhotos({
      query: "cat",
      page: page,
      perPage: 10,
      orientation: "portrait",
    });

     
  if (result.errors) {
    // handle error here
    console.log("error occurred: ", result.errors[0]);
  } else {
      return result.response.results;
  }
  }

   catch(error) {
    console.error("Failed to fetch images from Unsplash", error);
    throw error;
  }
};

export const fetchImageById = async (id) => {
  try {
    const response = await fetch(`${UNSPLASH_BASE_URL}/photos/${id}`, {
      headers: {
        Authorization: `Client-ID ${VITE_UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch image from Unsplash");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
