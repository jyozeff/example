import React from 'react'
import RModal from 'react-modal'
import variables from '../styles/common/variables.module.scss'
import Button from '../components/button'
import { t } from 'i18next'
import Close from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

const defaultInnerContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  backgroundColor: variables.blank,
  padding: '3vh 1vh',
  overflow: 'auto',
  maxHeight: '80vh',
}

const defaultStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: variables.blank,
    borderRadius: '10px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 200,
  },
}
interface Props {
  style?: {
    content?: { [k: string]: string }
    overlay?: { [k: string]: string }
  }
  isOpen?: boolean
  onRequestClose?: () => void
  content?: any
  undismissable?: boolean
  closeButtonVariant?: 'text' | 'outlined' | 'contained'
  closeButtonText?: string
  shouldHideCloseButton?: boolean // modal may or may not be dismissable but just don't want to show the close button
  shouldRenderTopCloseButton?: boolean
  innerContainerStyle?: any
}

export default function Modal({
  isOpen,
  onRequestClose,
  style,
  content,
  undismissable,
  shouldRenderTopCloseButton,
  shouldHideCloseButton,
  closeButtonVariant,
  closeButtonText,
  innerContainerStyle,
}: Props) {
  return (
    <RModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={!undismissable ? onRequestClose : () => {}}
      style={{ ...defaultStyle, ...(style || {}) }}
    >
      <div
        style={
          innerContainerStyle
            ? { ...defaultInnerContainerStyle, ...innerContainerStyle }
            : defaultInnerContainerStyle
        }
      >
        {shouldRenderTopCloseButton && (
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
            }}
          >
            <IconButton onClick={onRequestClose} size="small">
              <Close sx={{ fontSize: '20px' }} />
            </IconButton>
          </div>
        )}
        {content}
        {!undismissable && !shouldHideCloseButton && (
          <Button
            variant={closeButtonVariant}
            style={{ fontSize: '16px' }}
            text={closeButtonText || t('close')}
            onClick={onRequestClose}
          />
        )}
      </div>
    </RModal>
  )
}
