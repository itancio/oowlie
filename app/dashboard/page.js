'use client'
import { 
    AppBar,
    Box,
    Button,
    Card,
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

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useEffect, useState} from 'react'
import {useUser} from "@clerk/nextjs"
import {collection, doc, getDoc, setDoc} from 'firebase/firestore'
import {useRouter} from 'next/navigation'
import Flashcards from '@/components/Flashcards'


export default function DashboardPage() {
    const {isLoaded, isSignedIn, user} = useUser()
    const username = user?.firstName

    const welcomeSuffix = username ? `Welcome, ${username}!` : '';
    
    return (
        <Container maxWidth='100vw'>
            <Box sx={{my: 5}}>
                <Button href='/generate' variant='contained' startIcon={<AddCircleOutlineIcon />}>Create New</Button>
            </Box>
            <Grid container spacing={3} sx={{mt: 4}}>
                { (isSignedIn) 
                && <Flashcards /> 
                }
            </Grid>
        </Container>
    )   
}