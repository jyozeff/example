import React, { useState, useContext } from 'react'

const defaultVal: GlobalContextProps = {
  storeModal: {
    isOpen: false,
    setIsOpen: (_: boolean) => {},
  },
  contactModal: {
    isOpen: false,
    setIsOpen: (_: boolean) => {},
  },
  snackbar: {},
  dialog: {},
  acceptedTerms: false,
  setAcceptedTerms: (_: boolean) => {},
}

export const GlobalContext = React.createContext<GlobalContextProps>(defaultVal)

export function useGlobal() {
  return useContext(GlobalContext)
}

export function GlobalProvider({ children }: any) {
  const [contactModalIsOpen, setContactModalIsOpen] = useState(
    defaultVal.contactModal.isOpen,
  )
  const [acceptedTerms, setAcceptedTerms] = useState(defaultVal.acceptedTerms)
  const [snackbarMessage, setSnackbarMessage] = useState(
    defaultVal.snackbar.message,
  )
  const [snackbarDuration, setSnackbarDuration] = useState(
    defaultVal.snackbar.duration,
  )
  const [dialogTitle, setDialogTitle] = useState(defaultVal.dialog.title)
  const [dialogBody, setDialogBody] = useState(defaultVal.dialog.body)

  const value = {
    contactModal: {
      isOpen: contactModalIsOpen,
      setIsOpen: (arg: boolean) => {
        setContactModalIsOpen(arg)
      },
    },
    snackbar: {
      message: snackbarMessage,
      setMessage: setSnackbarMessage,
      duration: snackbarDuration,
      setDuration: setSnackbarDuration,
    },
    dialog: {
      title: dialogTitle,
      setTitle: setDialogTitle,
      body: dialogBody,
      setBody: setDialogBody,
    },
    acceptedTerms,
    setAcceptedTerms
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
