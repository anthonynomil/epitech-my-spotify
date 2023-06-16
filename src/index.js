import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {router} from "./routes/routes";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline>
            <RouterProvider router={router}/>
        </CssBaseline>
    </ThemeProvider>
);