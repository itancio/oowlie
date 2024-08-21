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


//==============================================================
// List of features to display in the landing page
const features = [
  {
    title: 'Easy Text Input', 
    description: 'Simply input your text and let our software do the rest',
    icon: '/images/article.png',
  },
  {
    title: 'Smart Flashcards', 
    description: ` Our AI intelligently breaks down your text into concise flashcards,
      perfect for studying`,
    icon: '/images/carousel.png',
  },
  {
    title: 'Accesible Anywhere', 
    description: `Access your flashcards from any device, at any time. Study on the go`,
    icon: '/images/cloud.png',
  },

]

// Layout and UI elements for the features section
const FeatureBox = ({background = null, icon = null, title, description}) => {
  return (
    <Box 
      sx={{
  
        maxWidth: 300,
        mx: 3,
      }} 
      key={title}
    >
      <Box sx={{flexWrap: 'wrap', p: 4}}>
          <Typography 
            gutterBottom
            variant="h5"
            color='primary'
          >
            {title}
          </Typography>
          <Box
            component='img'
            sx={{ height: 60, my:5}}
            src={icon}
          >        
          </Box>
          <Typography variant='body1' >
            {description}
          </Typography>
      </Box>
    </Box>
  )
}
//==============================================================


export const Features = () => {
  return (
    <Box sx = {{my: 30}}  textAlign='center'>
      <Typography 
        color='primary' 
        variant="h4" 
        fontWeight={'bold'}>
          What you can Expect
      </Typography>
      <Grid container
        display='flex' 
        alignItems='center'
        justifyContent='center'
      >
        {features.map((feature, index) => (
          <Grid item key={index}>
            <FeatureBox 
              title={feature.title} 
              description={feature.description}
              icon={feature.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Features;
