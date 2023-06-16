import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

const TrackListCard = ({track, action}) => {
    return (
        <Card sx={{maxWidth: 350, height: '100%'}}>
            <CardActionArea onClick={() => action(track)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {track.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default TrackListCard;