import {useEffect, useState} from "react";
import {getArtistList, getArtistListFiltered} from "../../services/request";
import {Box, Container, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Typography} from "@mui/material";
import ArtistListCard from "../../components/ArtistListCard";
import Navbar from "../../components/navigation/Navbar";

const ArtistList = () => {

    const [artists, setArtists] = useState([]);
    const [elemPerPage, setElemPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getApiInfos();
    }, [page, elemPerPage]);

    const handleElemPerPageChange = (event) => {
        setElemPerPage(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getApiInfos = async () => {
        const response = await getArtistListFiltered(page, elemPerPage);
        const countResponse = await getArtistList();
        setArtists(response.data);
        setTotalPages(Math.ceil(countResponse.data.length / elemPerPage));
    };

    return (
        <div>
            <Navbar/>
            <Container sx={{marginTop: "50px"}}>
                <div>
                    <Typography variant="h1" textAlign="center" sx={{margin: "25px 0 25px 0"}}>Artist List</Typography>
                </div>
                <Grid container spacing={2} id="artist-list" alignItems="stretch" justifyContent="center">
                    {artists.map((artist) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={artist.name}>
                            <ArtistListCard artist={artist}/>
                        </Grid>
                    ))}
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
                            value={elemPerPage}
                            label="Elements"
                            onChange={handleElemPerPageChange}
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
            </Container>
        </div>
    );
};

export default ArtistList;