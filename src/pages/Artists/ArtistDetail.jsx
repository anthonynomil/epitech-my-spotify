import {useParams} from "react-router-dom";
import {Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getArtist, getArtistAlbums} from "../../services/request";
import AlbumListCard from "../../components/AlbumListCard";
import Navbar from "../../components/navigation/Navbar";

const ArtistDetail = () => {
    const artistId = useParams().id;
    const [artist, setArtist] = useState({});
    const [artistAlbums, setArtistAlbums] = useState([]);


    useEffect(() => {
        handleArtist();
        handleArtistAlbums();
    });

    const handleArtist = async () => {
        const response = await getArtist(artistId);
        setArtist(response.data);
    };

    const handleArtistAlbums = async () => {
        const response = await getArtistAlbums(artistId);
        setArtistAlbums(response.data);
    };

    return (
        <div>
            <Navbar/>
            <Container>
                <Typography variant="h1" textAlign="center" sx={{margin: "25px 0 25px 0"}}>Artist Detail</Typography>
                <Card sx={{maxWidth: "100%", marginTop: "50px"}}>
                    <CardMedia
                        component="img"
                        height="100%"
                        image={artist.photo}
                        alt={artist.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {artist.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {artist.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{marginTop: "20px"}}>
                            {artist.bio}
                        </Typography>
                    </CardContent>
                </Card>
                <Typography variant="h2" textAlign="center" sx={{margin: "25px 0 25px 0"}}>Albums from this
                    artist</Typography>
                <Grid container spacing={2} id="artist-list" alignItems="stretch" justifyContent="center"
                      sx={{marginTop: "50px"}}>
                    {artistAlbums.map((album) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={album.name}>
                            <AlbumListCard album={album}/>
                        </Grid>
                    ))
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default ArtistDetail;