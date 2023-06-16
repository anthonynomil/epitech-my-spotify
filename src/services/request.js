import {apiUrl} from "../global/apiUrl";
import axios from "axios";

export const getArtistListFiltered = async (page, elemPerPage) => {
    return await axios.get(apiUrl('artists'), {
        params: {
            page: page,
            limit: elemPerPage,
        },
    });
};
export const getArtistList = async () => {
    return await axios.get(apiUrl('artists'));
};

export const getArtist = async (id) => {
    return await axios.get(apiUrl(`artists/${id}`));
};

export const getArtistAlbums = async (id) => {
    return await axios.get(apiUrl(`albums/artist/${id}`));
};

export const getGenreList = async () => {
    return await axios.get(apiUrl('genres'));
};

export const getGenreDetail = async (id) => {
    return await axios.get(apiUrl(`genres/${id}`));
};

export const getAlbums = async (page, elemPerPage) => {
    return await axios.get(apiUrl('albums'), {
        params: {
            page: page,
            limit: elemPerPage,
        },
    });
};

export const getAlbumsById = async (id) => {
    return await axios.get(apiUrl(`albums/${id}`));
}

export const getAlbumsCount = async () => {
    return await axios.get(apiUrl('albums'))
};

export const getTracks = async (id) => {
    return await axios.get(apiUrl(`albums/${id}`));
};

export const getSearchResult = async (query, type) => {
    return await axios.get(apiUrl(`search?query=${query}&type=${type}`));
}