'use client'

import {useState} from "react"
import {useRouter} from 'next/navigation'
import {useUser} from "@clerk/nextjs"
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

import { db } from "@/firebase"
import {DisplayCards} from '@/components/DisplayCards'


export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser()

    // Use for flashcards array and flipped state
    const [flashcards, setFlashcards] = useState([]) //array of flashcards
    const [flipped, setFlipped] = useState([])

    // Use for the generation textfield input
    const [text, setText] = useState('')

    // Use for setting the title of the flashcard to be saved
    const  [name, setName] = useState('')

    // Use for modal dialog state change
    const [open, setOpen] = useState(false) //use for modal dialog state change

    // Use for routing pages
    const router = useRouter();

    const handleSubmit = async () => {
        if (!text.trim()) {
          alert('Please enter some text to generate flashcards.')
          return
        }
      
        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            body: text,
          })
      
          if (!response.ok) {
            throw new Error('Failed to generate flashcards')
          }
      
          const data = await response.json()
          setFlashcards(data)
        } catch (error) {
          console.error('Error generating flashcards:', error)
          alert('An error occurred while generating flashcards. Please try again.')
        }
      }

    const handleCardClick = (id) => {
        setFlipped((prev) => (
            {...prev, [id]:!prev[id] }
        ))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const saveFlashcards = async () => {
        console.log('Saving flashcards :', isSignedIn)


        if (!name) {
            alert('Please enter a name for your flashcards')
            return
        }

        if (!isSignedIn) {
            router.push('/sign-up')
        }

        else {
            const userDocRef = doc(collection(db, 'users'), user.id)
            const snapshot = await getDoc(userDocRef)
            console.log("userDocSnap: ", snapshot.exists())
        
            const batch = writeBatch(db)
        
            if (snapshot.exists()) {
                const collections = snapshot.data().flashcards || []
                console.log("collections: ", collections)
                if (collections.find((f) => f.name === name)) {
                    alert('Flashcard collection with the same name already exists.')
                    return
                } else {
                    collections.push({name})
                    batch.set(userDocRef, {flashcards: collections}, {merge: true})
                }
            } else {
                console.log("name: ", name)
                batch.set(userDocRef, { flashcards: [{name}] })
            }
        
            const cardsColRef = collection(userDocRef, name)
            flashcards.forEach((card) => {
                const cardsDocRef = doc(cardsColRef)
                batch.set(cardsDocRef, card)
            })
        
            await batch.commit()

            alert('Flashcards saved successfully!')
            handleClose()
            setName('')
            router.push('/flashcards')
        }
        
    }

    return (
        <Container maxWidth="md">
            <Box
            sx={{
                mt: 4,
                mb: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography variant='h4' color='primary'>    
                    Generate Flashcards
                </Typography>
                <Paper sx={{p:4, width: '100%'}} >
                    <TextField 
                        value = {text}
                        onChange={(e) => setText(e.target.value)}
                        label='Enter text'
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                            mb: 2,
                            width: '100%'
                        }}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={() => handleSubmit()}
                    >   
                        submit
                    </Button>
                </Paper>
            </Box>

           
            {flashcards.length > 0 && (
                <Box sx={{mt: 4}}>
                    <Typography variant='h5'>Flashcards Preview</Typography>
                    <Grid container spacing ={3}>

                        {/* Display the flashcards */}
                        <DisplayCards flashcards={flashcards} />

                    </Grid>
                    <Box sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
                        <Button variante='contained' color="secondary" onClick={handleOpen}>
                            Save
                        </Button>
                    </Box>
                </Box>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your flashcards collection.
                    </DialogContentText>
                    <TextField
                        autofocus
                        margin='dense'
                        label='Flashcard Set Name'
                        type='text'
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant='outlined'
                        sx={{mb: 2}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={saveFlashcards} color='primary'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}