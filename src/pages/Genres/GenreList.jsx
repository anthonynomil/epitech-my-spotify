import {useEffect, useState} from 'react';
import {getGenreList} from '../../services/request';
import Navbar from "../../components/navigation/Navbar";
import GenreListCard from "./GenreListCard";
import {Container, Grid, Typography} from "@mui/material";

export const GenreList = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            const genres = await getGenreList();
            setGenres(genres.data);
        }

        fetchGenres();
    }, []);

    const renderItem = (genre) => (<Grid item xs={12} sm={6} md={4} lg={3} key={genre.name}>
        <GenreListCard key={genre.name} genre={genre}/>
    </Grid>);


    return (<div>
        <Navbar/>
        <Container>
            <Typography textAlign="center" variant="h3" sx={{padding: "50px"}}>Genre List</Typography>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {genres.map(renderItem)}
            </Grid>
        </Container>
    </div>);
};
