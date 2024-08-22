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
        <Container maxWidth='100vw' sx={{padding: 2}}>
            <Button href='/dashboard' variant='contained' startIcon={<ArrowCircleLeftIcon />}>Back</Button>
            <Container maxWidth="md" sx={{ mt: 1, mb: 4 }}>
                <Box sx={{my: 5, display: 'flex', justifyContent: 'center'}}>
                    <Typography variant='h4' color='primary' sx={{fontWeight: 700}}>{search.toUpperCase()}</Typography>
                </Box>
                <Card
                    onClick={() => handleCardClick(currentCard)}
                    sx={{ 
                        minHeight: 300,
                        borderRadius: 16,
                        border: '1px solid #feb83d',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        cursor: 'pointer',
                        perspective: 1000,
                        mt: 3,
                    }}
                    >
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.6s',
                        transformStyle: 'preserve-3d',

                    }}>
                        <Box 
                            sx={{
                                perspective: '10000px',
                                textAlign: 'center',
                                padding: 1,
                                '& > div': {
                                    height: '20rem',
                                    transition: 'transform 0.6s',
                                    transformStyle: 'preserve-3d',
                                    position: 'relative',
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
                                    boxSizing: 'border-box',
                                },
                                '& > div > div:nth-of-type(2)': {
                                    transform: 'rotateY(180deg)',
                                },
                            }}
                        >
                            <div>
                                <div>
                                    <Typography variant="h6" component="div">
                                        {flashcards[currentCard]?.front}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="h6" component="div" >
                                        {flashcards[currentCard]?.back}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </Box>  
                </Card>
                <Box>


                </Box>
                <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                    <IconButton onClick={handlePrevious} color="primary" sx={{ fontSize: '2rem' }}>
                        <ArrowBackIosNewRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <Typography sx={{ mt: 3, textAlign: 'center', pb: 2 }} color="primary">
                        Card {currentCard + 1} of {numCards}
                    </Typography>
                    <IconButton onClick={handleNext} color="primary" sx={{ fontSize: '2rem', zIndex: 2 }}>
                        <ArrowForwardIosRoundedIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Container>

            {/* Display the flashcards */}
            {/* <DisplayCards flashcards = {flashcards}/> */}

        </Container>
    )
    
}