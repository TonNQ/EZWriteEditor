import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/Routes'
import { SnackbarProvider } from 'notistack'
import LinearProgress from './components/LinearProgress'
import DialogError from './components/DialogError'
import Snackbar from './components/Snackbar'
import { ThemeProvider } from '@mui/material'
import lightTheme from './themes/lightTheme'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <SnackbarProvider
          autoHideDuration={import.meta.env.REACT_APP_AUTO_HIDE_SNACKBAR || 3000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          maxSnack={import.meta.env.REACT_APP_MAX_SNACKBAR || 3}
        >
          <LinearProgress />
          <DialogError />
          <Routes />
          <Snackbar />
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
