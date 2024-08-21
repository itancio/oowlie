'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useUser} from "@clerk/nextjs"

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
    IconButton,
    Paper,
    TextField,
    Toolbar,
    Typography,

    createTheme,
    useMediaQuery,
} from "@mui/material"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
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

    // Use for states of the card
    const [currentCard, setCurrentCard] = useState(0)
    const [flipped, setFlipped] = useState([])

    const numCards = flashcards.length

    const router = useRouter()

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
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

    // if (!isLoaded || !isSignedIn) {
    //     router.push('/')
    // }

    const handlePrevious = () => {
        setCurrentCard(Math.max(0, currentCard - 1))
    }

    const handleNext = () => {
        setCurrentCard(Math.min(currentCard + 1, numCards - 1))
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => (
            {...prev, [id]:!prev[id] }
        ))
    }

    return (
        <Container maxWidth='100vw'>
            <Box sx={{my: 5}}>
                <Button href='/dashboard' variant='contained' startIcon={<ArrowCircleLeftIcon />}>Back</Button>
            </Box>
            <Typography variant='h4' color='primary' sx={{fontWeight: 700}}>{search.toUpperCase()}</Typography>
            <Grid container spacing={3} sx={{mt: 4, backgroundColor: 'gold'}} >
                <Grid item></Grid>
                <Grid item></Grid>
                <Grid item></Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>

                <IconButton onClick={handlePrevious} color="primary" sx={{ fontSize: '2rem' }}>
                    <ArrowBackIosNewRoundedIcon fontSize="inherit" />
                </IconButton>

                <Card display='flex' sx={{minWidth: 500}}>
                    <CardActionArea onClick={() => handleCardClick(currentCard)}>
                        <CardContent>
                            <Box 
                                sx={{
                                    perspective: '1000px',
                                    '& > div': {
                                        transition: 'transform 0.6s',
                                        transformStyle: 'preserve-3d',
                                        position: 'relative',
                                        width: '100%',
                                        height: '200px',
                                        // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                        transform: flipped[currentCard] 
                                            ? 'rotateY(180deg)'
                                            : 'rotateY(0deg)',
                                    },
                                    '& > div > div': {
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 2,
                                        boxSizing: 'border-box',
                                    },
                                    '& > div > div:nth-of-type(2)': {
                                        transform: 'rotateY(180deg)',
                                    },
                                }}
                            >
                                <div>
                                    <div>
                                        <Typography variant="body2" component="div">
                                            {flashcards[currentCard]?.front}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body1" component="div" >
                                            {flashcards[currentCard]?.back}
                                        </Typography>
                                    </div>
                                </div>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
 
                <IconButton onClick={handleNext} color="primary" sx={{ fontSize: '2rem' }}>
                    <ArrowForwardIosRoundedIcon fontSize="inherit" />
                </IconButton>
                </Box>

                {/* Display the flashcards */}
                {/* <DisplayCards flashcards = {flashcards}/> */}
    
            </Grid>

            <Grid>
                {currentCard + 1} of {numCards}
            </Grid>
        </Container>
    )
    
}