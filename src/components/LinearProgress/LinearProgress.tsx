import { Backdrop, LinearProgress as LinearProgressBar, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

// selectors
// import { isLoadingSelector } from 'selectors/app.selector';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '20%',
    backgroundColor: theme.palette.primary.light,
    padding: '8px 16px',
    '& span': {
      display: 'block'
    },
    '& > * + *': {
      marginTop: theme.spacing(1)
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const LinearProgress = () => {
  const classes = useStyles()
  // const isLoading = useSelector(isLoadingSelector);

  return (
    // <Backdrop className={classes.backdrop} open={isLoading}>
    <Backdrop className={classes.backdrop} open={false}>
      <div className={classes.root}>
        <span>Loading...</span>
        <LinearProgressBar />
      </div>
    </Backdrop>
  )
}

export default LinearProgress
