import {useEffect, useState} from 'react';
import {
    Box,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    TextField, Typography
} from '@mui/material';
import Navbar from "../../components/navigation/Navbar";
import Button from "@mui/material/Button";
import {getSearchResult} from "../../services/request";
import AlbumListCard from "../../components/AlbumListCard";
import ArtistListCard from "../../components/ArtistListCard";
import GenreListCard from "../Genres/GenreListCard";
import {handleResponsePagination} from "../../utils/randomFonction";

export const Search = () => {
    const [inputSearch, setInputSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [searchType, setSearchType] = useState('artist')
    const [page, setPage] = useState(1)
    const [elementPerPage, setElementPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(10)
    const [paginationHidden, setPaginationHidden] = useState(true)
    const [cleanedResult, setCleanedResult] = useState([])

    const handleSearchText = (event) => {
        setInputSearch(event.target.value);
    }

    const handleSearchType = (event) => {
        setSearchType(event.target.value);
    }

    const handlePageChange = (event, value) => {
        if (value <= totalPages) {
            setPage(value)
        } else {
            setPage(1)
        }
    }

    const handleElementPerPageChange = (event) => {
        setElementPerPage(event.target.value);
        if (page > searchResult.length / elementPerPage) {
            setPage(1)
        }
    }

    const handleSearch = async () => {
        const response = await getSearchResult(inputSearch, searchType)
        setSearchResult(response.data[Object.keys(response.data)[0]])
        setTotalPages(Math.ceil(response.data[Object.keys(response.data)[0]].length / elementPerPage))
        setPaginationHidden(false)
    }

    const handleChangePagination = () => {
        if (paginationHidden) return
        const index = page * elementPerPage - elementPerPage
        const responsePagination = handleResponsePagination(index, elementPerPage, searchResult)
        setTotalPages(Math.ceil(searchResult.length / elementPerPage))
        setCleanedResult(filterSearch(responsePagination, searchType))
    }

    useEffect(() => {
        setTotalPages(Math.ceil(searchResult.length / elementPerPage))
        handleChangePagination()
    }, [searchResult, page, elementPerPage, totalPages])

    const filterSearch = (data, searchType) => {
        let value;
        if (data.length === 0) {
            return (
                <Typography variant="h4" textAlign="center" sx={{margin: "50px 0"}}>No result found</Typography>)
        }
        switch (searchType) {
            case 'album':
                value = data.map((album) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={album.name}>
                            <AlbumListCard key={album.name} album={album}/>
                        </Grid>
                    )
                })
                break;
            case 'artist':
                value = data.map((artist) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={artist.name}>
                            <ArtistListCard key={artist.name} artist={artist}/>
                        </Grid>
                    )
                })
                break;
            case 'genre':
                value = data.map((genre) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={genre.name}>
                            <GenreListCard key={genre.name} genre={genre}/>
                        </Grid>
                    )
                })
                break;
            default:
                console.error("Search type not found")
                break;
        }
        return (
            <div>
                <Grid container spacing={4} justifyContent="center" alignItems="center" marginTop="100px">
                    {value}
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
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <Container>
                <Typography textAlign="center" variant="h3" sx={{padding: "50px"}}>Search</Typography>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item>
                        <TextField onChange={handleSearchText} value={inputSearch} label="Search">
                        </TextField>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="searchTypeLabel">Type</InputLabel>
                            <Select
                                labelId="searchTypeLabel"
                                id="searchType"
                                value={searchType}
                                label="Type"
                                onChange={handleSearchType}
                            >
                                <MenuItem value={"artist"}>Artist</MenuItem>
                                <MenuItem value={"album"}>Album</MenuItem>
                                <MenuItem value={"genre"}>Genre</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button type="submit" onClick={handleSearch} sx={{height: "100%"}}>Search</Button>
                    </Grid>
                </Grid>
            </Container>
            {cleanedResult}
        </div>
    );
};
