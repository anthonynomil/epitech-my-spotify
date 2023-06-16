import {createBrowserRouter} from "react-router-dom";
import {Home} from "../pages/Home";
import ArtistList from "../pages/Artists/ArtistList";
import ArtistDetail from "../pages/Artists/ArtistDetail";
import {GenreList} from "../pages/Genres/GenreList";
import {GenreDetails} from "../pages/Genres/GenreDetail";
import {Search} from "../pages/Search/SearchDetail";
import TracksDetail from "../pages/Tracks/TracksDetail";
import AlbumList from "../pages/Albums/AlbumList";

export const router = createBrowserRouter([
    // Remplacer le path par l'url de votre page example /artists par example
    // et remplacer l'element par votre page par example <Artists/>
    // {
    //     path: "/contacts",
    //     element: <Contacts/>
    // },
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/artists",
        element: <ArtistList/>
    },
    {
        path: "/artist/:id",
        element: <ArtistDetail/>
    },
    {
        path: "/genres",
        element: <GenreList/>
    },
    {
        path: "/genres/:id",
        element: <GenreDetails/>
    },
    {
        path: "/search",
        element: <Search/>
    },
    {
        path: "/tracks/:id",
        element: <TracksDetail/>
    },
    {
        path: "/albums",
        element: <AlbumList/>
    },
]);