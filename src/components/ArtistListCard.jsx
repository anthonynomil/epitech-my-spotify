import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const ArtistListCard = ({artist}) => {
    const link = `/artist/${artist.id}`;
    return (
        <Card sx={{maxWidth: 350, height: '100%'}}>
            <CardActionArea component={Link} to={link}>
                <CardMedia
                    component="img"
                    height="200"
                    image={artist.photo}
                    alt={artist.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {artist.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {artist.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ArtistListCard;