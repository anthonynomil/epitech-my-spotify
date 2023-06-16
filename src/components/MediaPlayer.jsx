import { Box, Typography } from "@mui/material";

export default function MediaPlayer({ track }) {
  return (
    <Box
      sx={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "50px" }}>
        Currently playing: {track.name}
      </Typography>
      <audio autoPlay controls src={track.mp3}></audio>
    </Box>
  );
}
