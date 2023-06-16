import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const GenreListCard = ({genre}) => {
    const link = `/genres/${genre.id}`;
    return (
        <Card sx={{maxWidth: 350, height: '100%'}}>
            <CardActionArea component={Link} to={link}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {genre.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {genre.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default GenreListCard;