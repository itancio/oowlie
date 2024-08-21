
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
import {useEffect, useState} from 'react'
import {useUser} from "@clerk/nextjs"


export const DisplayCards = ({flashcards}) => {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flipped, setFlipped] = useState([])
    const handleCardClick = (id) => {
        setFlipped((prev) => (
            {...prev, [id]:!prev[id] }
        ))
    }

    if (!isLoaded) {
        return <></>
    }

    return (
        <>
            {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
       
                    <Card>
                    <CardActionArea onClick={() => handleCardClick(index)}>
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
                                        transform: flipped[index] 
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
                                            {flashcard.front}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body1" component="div" >
                                            {flashcard.back}
                                        </Typography>
                                    </div>
                                </div>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
            ))}

        </>

    )
}

export default DisplayCards;