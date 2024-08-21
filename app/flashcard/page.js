'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useUser} from "@clerk/nextjs"
import {Grid, Box, Paper, TextField, Container, 
        Button, AppBar, Toolbar, Typography, Card,
        CardActionArea, CardContent, Dialog, DialogContent,
        DialogContentText, DialogTitle, DialogActions} from "@mui/material"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { collection, getDoc, setDoc, getDocs, setDocs, writeBatch, doc, } from "firebase/firestore"
import db from "@/firebase"
import {DisplayCards} from '@/components/DisplayCards'

import { useSearchParams } from 'next/navigation'

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser()

    // Use for flashcards array and flipped state
    const [flashcards, setFlashcards] = useState([]) //array of flashcards

    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    console.log('search in FLASHCARD: ', search)

    const router = useRouter()

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            console.log('userDocRef in FLASHCARD: README')
            const userColRef = collection(db, 'users')
            const userDocRef = doc(userColRef, user.id)
            
            
            const cardsColRef = collection(userDocRef, search)
            const docs = await getDocs(cardsColRef)
       
            const cards = []

            docs.forEach((doc) => { 
                cards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(cards)
            console.log('cards: ', cards.length)
        }
        getFlashcard()
    }, [user, search])

    if (!isLoaded || !isSignedIn) {
        router.push('/')
    }

    return (
        <Container maxWidth='100vw'>
            <Box sx={{my: 5}}>
                <Button href='/dashboard' variant='contained' startIcon={<ArrowCircleLeftIcon />}>Back</Button>
            </Box>
            <Grid container spacing={3} sx={{mt: 4}}>
                {/* Display the flashcards */}
                <DisplayCards flashcards = {flashcards}/>
    
            </Grid>
        </Container>
    )
    
}