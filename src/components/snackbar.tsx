import React from 'react'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MuiSnackbar from '@mui/material/Snackbar'
import constants from '../lib/constants'

interface Props {
  message: string
  onClose: () => void
  duration?: number
}

export default function Snackbar({ onClose, message, duration }: Props) {
  return (
    <MuiSnackbar
      open={!!message}
      autoHideDuration={duration || constants.snackbarDurationMillis}
      onClose={onClose}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}
