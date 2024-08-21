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
import {useState} from 'react'
import {useUser} from "@clerk/nextjs"
import {collection, doc, getDoc, setDoc} from 'firebase/firestore'
import {db} from '@/firebase'
import {useRouter} from 'next/navigation'
import Flashcards from '@/components/Flashcards'


export default function DashboardPage() {
    const {isLoaded, isSignedIn, user} = useUser()
    const username = user?.firstName
    
    const welcomeSuffix = username ? `Welcome, ${username}!` : '';
    
    return (
        <>
            
            { (isSignedIn) 
            && <Flashcards /> 
            }
        </>
    )   
}