import Image from "next/image";
import {Grid, Box, Container, Button, AppBar, Toolbar, Typography} from "@mui/material"
import {SignedOut, SignedIn, UserButton, ClerkProvider} from "@clerk/nextjs"
import {Features} from "@/components/Features";
import {Pricing} from "@/components/Pricing";
import {Hero} from "@/components/Hero";
import {currentUser } from '@clerk/nextjs/server'




export default async function LandingPage() {

  return (

    <Container maxWidth='lg'>

      <Hero/>

      <Features />
  
      <Pricing />

    </Container>

  );
}
