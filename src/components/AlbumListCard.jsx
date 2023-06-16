import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const ArtistListCard = ({album}) => {
    const link = `/tracks/${album.id}`;
    return (
        <Card sx={{maxWidth: 350, height: '100%'}}>
            <CardActionArea component={Link} to={link}>
                <CardMedia
                    component="img"
                    height="200"
                    image={album.cover}
                    alt={album.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {album.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
        ;
};

export default ArtistListCard;