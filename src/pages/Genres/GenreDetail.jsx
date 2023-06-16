import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {getAlbumsById, getGenreDetail} from "../../services/request";
import Navbar from "../../components/navigation/Navbar";
import AlbumListCard from "../../components/AlbumListCard";
import {Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Typography} from "@mui/material";

export const GenreDetails = () => {
    const {id} = useParams();

    const [allAlbums, setAllAlbums] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(1);
    const [elementPerPage, setElementPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);


    useEffect(() => {
        getGenreAlbums();
    }, []);

    useEffect(() => {
        handleChangePagination()
    }, [page, elementPerPage, totalPages])

    const getGenreAlbums = async () => {
        const genresAlbums = await getGenreDetail(id);
        setAllAlbums(genresAlbums.data.albums)
        setTotalPages(Math.ceil(genresAlbums.data.albums.length / elementPerPage));
        const albums = [];
        for (let i = 0; i < 10; ++i) {
            const album = await getAlbumsById(genresAlbums.data.albums[i]);
            albums.push(album.data.album);
        }
        setAlbums(albums);
    }

    const handlePageChange = (event, value) => {
        if (value <= totalPages) {
            setPage(value)
        } else {
            setPage(1)
        }
    }

    const handleChangePagination = () => {
        setTotalPages(Math.ceil(allAlbums.length / elementPerPage))
        getAlbums();
    }

    const handleElementPerPageChange = (event) => {
        setElementPerPage(event.target.value);
        if (page > albums.length / elementPerPage) {
            setPage(1)
        }
    }

    const getAlbums = async () => {
        const tempAlbum = [];
        const index = page * elementPerPage - elementPerPage;
        const condition = (elementPerPage * page)
        for (let i = index; i < condition && i < allAlbums.length; ++i) {
            const album = await getAlbumsById(allAlbums[i]);

            tempAlbum.push(album.data.album);
        }
        setAlbums(tempAlbum);
    }


    return (<div>
        <Navbar/>
        <Typography variant="h3" sx={{padding: "50px 0 50px 0", textAlign: "center"}}>Albums</Typography>
        <Grid container spacing={2} id="artist-list" alignItems="stretch" justifyContent="center">
            {albums.map((album) => {
                if (!album) return

                return (<Grid item xs={12} sm={6} md={4} lg={3} key={album.name}>
                    <AlbumListCard key={album.name} album={album}/>
                </Grid>);
            })}
        </Grid>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            padding: "50px 0 50px 0",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <FormControl sx={{width: "100px"}}>
                <InputLabel id="selectElemPerPage">Elements</InputLabel>
                <Select
                    value={elementPerPage}
                    label="Elements"
                    onChange={handleElementPerPageChange}
                    id="selectElemPerPage"
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
        </Box>
    </div>);
};
