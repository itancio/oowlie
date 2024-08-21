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
import {getStripe} from '@/app/utils/getStripe'
import Link from 'next/link'



//==============================================================
  const handleSubmit = async () =>{
    const reqOptions = {
        method: 'POST',
        headers: {
            origin: 'http://localhost:3000'
        },
    }
    const checkoutSession = await fetch('api/checkout_session', reqOptions)
    const checkoutSessionJson = await checkoutSession.json()
    console.log('checkoutSession in Pricint :', checkoutSessionJson)

    if (checkoutSessionJson.statusCode === 500) {
       console.error('checkoutSessionJson.message')
       return
    }

    // Redirect to the Checkout.
    const stripe = await getStripe()
    const {error} = await stripe?.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: checkoutSessionJson.id,
    })

    if (error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message)
    }
  }
//==============================================================


export const Pricing = () =>{
    return (
        <Box sx={{my: 20, textAlign: 'center'}}>
            <Typography 
                color='primary' 
                variant="h4" 
                fontWeight={'bold'}
                gutterBottom
            >
                Pricing
            </Typography>
            <Grid container
                display='flex' 
                alignItems='center'
                justifyContent='center'
                sx={{
                    flexDirection: 'row', 
                    my: 5,
                }}
            >
                    <Card
                        sx={{
                            flexWrap: 'wrap', 
                            p: 6,
                            m: 2,
                            minHeight: 400,
                        }}
                    >
                 
                        <Typography 
                            gutterBottom
                            variant="h4"
                            color='primary'
                            sx={{fontWeight: 700, mt: 2}}
                        >
                            Basic
                        </Typography>                  
                        <Typography variant="h6" gutterBottom>
                            Generate flashcards for free
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                        FREE
                        </Typography>
                        <Button 
                            variant="contained" 
                            href='generate'
                            sx={{my:6}}
                        >
                            Try for free
                        </Button>
              
                    </Card>
      
                    <Card
                        sx={{
                            flexWrap: 'wrap', 
                            p: 6,
                            m: 2,
                            minHeight: 400,
                            border: '1px solid #feb83d',
                            background: 'linear-gradient(45deg, #fff 88%, #feb83d 88%)',
                        }}
                    >
            
                        <Typography 
                            gutterBottom
                            variant="h4"
                            color='primary'
                            sx={{fontWeight: 700, mt: 2}}
                        >
                            Pro
                        </Typography>                  
                        <Typography variant="h6" gutterBottom>
                            Unlimited flashcards and storage
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            $1.00 /mo
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit}
                            sx={{my:6}}
                        >
                           Choose Pro
                        </Button>
              
                
                    </Card>
           
            </Grid>
        </Box>
    )
}
export default Pricing;