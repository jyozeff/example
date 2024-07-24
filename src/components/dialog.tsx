import React from 'react'
import { t } from 'i18next'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
  isOpen: boolean
  onClose: () => void
  title?: string
  body?: string
  button1Label?: string
  button2Label?: string
  onButton1Click?: () => void
  onButton2Click?: () => void
  button1Style?: any
  button2Style?: any
}

export default function AlertDialog({
  isOpen,
  onClose,
  title,
  body,
  button1Label,
  button2Label,
  onButton1Click,
  onButton2Click,
  button1Style,
  button2Style,
}: Props) {
  const renderButtons = () => {
    if (!onButton1Click && !onButton2Click) {
      return <Button onClick={onClose}>{t('close')}</Button>
    }

    return (
      <>
        {onButton1Click && button1Label && (
          <Button style={button1Style} onClick={onButton1Click}>
            {button1Label}
          </Button>
        )}
        {onButton2Click && button2Label && (
          <Button style={button2Style} onClick={onButton2Click}>
            {button2Label}
          </Button>
        )}
      </>
    )
  }

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>{renderButtons()}</DialogActions>
      </Dialog>
    </>
  )
}
