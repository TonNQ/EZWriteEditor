import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'

export default function DialogError() {
  const handleClose = () => {
    console.log('close')
  }

  return (
    <div>
      <Dialog open={false} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Typography variant='h4' component='div'>
            Error
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Something went wrong from systems!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
