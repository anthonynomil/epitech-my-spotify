import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTracks } from "../../services/request";
import { Box, Container, Grid } from "@mui/material";
import TrackListCard from "../../components/TrackListCard";
import AlbumListCard from "../../components/AlbumListCard";
import MediaPlayer from "../../components/MediaPlayer";
import Navbar from "../../components/navigation/Navbar";

const TracksDetail = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [album, setAlbum] = useState({});
  const [currentTrack, setCurrentTrack] = useState({});

  const getRandomTrack = (tracks) => {
    return tracks[Math.ceil(Math.random() * tracks.length)];
  };

  const handleTracks = async () => {
    const response = await getTracks(id);
    setTracks(response.data.tracks);
    setAlbum(response.data.album);
    setCurrentTrack(getRandomTrack(response.data.tracks));
  };

  useEffect(() => {
    handleTracks();
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "25px",
          }}
        >
          <AlbumListCard album={album} />
        </Box>
        <Grid
          container
          spacing={2}
          id="artist-list"
          alignItems="stretch"
          justifyContent="center"
          marginTop="50px"
        >
          {tracks.map((track) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={track.name}>
              <TrackListCard track={track} action={setCurrentTrack} />
            </Grid>
          ))}
        </Grid>
        <MediaPlayer track={currentTrack} />
      </Container>
    </div>
  );
};

export default TracksDetail;
