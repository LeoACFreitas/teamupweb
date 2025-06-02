'use client'

import styles from "./page.module.css"
import RequestList from "./ui/requestList"
import { store, persistor } from './lib/store'
import { FetchProvider } from './lib/FetchContext'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from "@mui/material"
import { grey } from "@mui/material/colors"
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from "notistack"
import Header from "./ui/header"

export default function Home() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[300],
      },
    },
  })
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FetchProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <Header />
              <main className={styles.main}>
                <div style={hero}>
                  <h1 style={heroH1}>Team Up</h1>
                  <h3>Find people to play together</h3>
                </div>
                <div style={{padding: '2em'}}>
                  <RequestList />
                </div>
              </main>
              <footer>
                <a href="https://www.flaticon.com/free-icons/partner" title="partner icons">Partner icons created by Freepik - Flaticon</a>
              </footer>
            </SnackbarProvider>
          </ThemeProvider>
        </FetchProvider>
      </PersistGate>
    </Provider>
  )
}

const hero: React.CSSProperties = {
  marginTop: "2em",
  padding: "2em",
  backgroundColor: "#878787",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const heroH1: React.CSSProperties = {
  fontSize: "78px",
  marginBlockStart: "0.2em",
  marginBlockEnd: "0.2em",
}
