import React from 'react'
import { 
    AppBar,
    Box,
    Button,
    CardActionArea,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Toolbar,
    Typography,

    createTheme,
    useMediaQuery,
} from "@mui/material"
import {SignUp} from '@clerk/nextjs'
import Image from 'next/image'


export default function SignUpPage() {
    return (
        <Container maxWidth='md'>
            <Grid container
                display = 'flex'
                flexDirection= 'row'
                alignItems='center'
                justifyContent='center'
                marginTop='50px'
            >
                <Box
                    display = 'flex'
                    flexDirection = 'column'
                    alignItems = 'center'
                    justifyContent='center'
                    margin= '20px'
                >
                    <Typography 
                        variant='h4'
                        color='primary'
                        gutterBottom
                        align= 'center'
                    >
                        Join Oowlie today 
                    </Typography>
                    <Image alt='logo' src='/images/logo.png' width={100} height={100} />
                </Box>

                <SignUp />

            </Grid>
        </Container>
    )
}