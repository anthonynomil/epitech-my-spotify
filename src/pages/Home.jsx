import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getAlbums} from "../services/request";
import AlbumListCard from "../components/AlbumListCard";
import Navbar from "../components/navigation/Navbar";
import {Container, Grid, Typography} from "@mui/material";

export const Home = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        async function fetchAlbums() {
            const response = await getAlbums(50);
            setAlbums(shuffle(response.data));
        }

        fetchAlbums();
    }, []);

    function shuffle(array) {
        let currentIndex = array.length - 1;
        let temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    return (
        <div>
            <Navbar/>
            <Typography variant="h3" textAlign="center" sx={{margin: "50px 0"}}>Welcome to SpotiStackers</Typography>
            <Typography variant="h5" textAlign="center" sx={{margin: "50px 0"}}>Here are some albums</Typography>
            <Grid container spacing={2} id="artist-list" alignItems="stretch" justifyContent="center">
                {albums.map(album => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={album.name}>
                        <AlbumListCard key={album.name} album={album}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
