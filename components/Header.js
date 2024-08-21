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
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material"

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import React from "react"

import {
  SignedIn, 
  SignInButton,
  SignedOut,
  SignOutButton, 
  UserButton
} from "@clerk/nextjs"

import Image from "next/image";
import {useUser} from '@clerk/nextjs'

export const Header = () => {
  const user = useUser;

    return (
      <AppBar position='static'sx={{backgroundColor: '#3f51b5'}}>
        <Toolbar
          sx={{
            background: 'linear-gradient(45deg, #feb83d 65%, #00a1fc 65%)',
            display: 'flex',
            justifyContent:'space-between',
            alignItems: 'center',
            padding: '0 16px',}}
        >
          <Box 
            style={{flexGrow: 2}}
          >
            <Button href='/' variant="text">
              <Image 
                alt='logo' 
                src='/images/logo.png' 
                width={32} 
                height={32}
              />
              <Typography variant='h6' color='primary' paddingLeft={2} sx={{fontWeight: '600'}}>OOwlie</Typography>
            </Button>
          </Box>
  
          <SignedOut>
            <SignInButton>
              <Button variant='text' endIcon={<LoginIcon/>}>Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button href='/dashboard'>Dashboard</Button>
            <SignOutButton>
              <UserButton />
            </SignOutButton>
          </SignedIn>
      
        </Toolbar>
      </AppBar>
    )
}


export default Header;

