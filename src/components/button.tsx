import React from 'react'
import MuiButton from '@mui/material/Button'

const buttonStyle = {
  width: '130px',
  height: '30px',
  textTransform: 'none',
}

interface Props {
  text: string
  onClick: () => void
  testId?: string
  variant?: 'text' | 'outlined' | 'contained'
  borderAlwaysSolid?: boolean
  style?: any
  startIcon?: React.ReactNode
  disabled?: boolean
}

const Button = ({
  testId,
  text,
  onClick,
  variant = 'outlined',
  borderAlwaysSolid = false,
  style,
  startIcon,
  disabled,
}: Props) => {
  return (
    <MuiButton
      disabled={disabled}
      data-test={testId}
      sx={{
        ...buttonStyle,
        ...style,
        ...(borderAlwaysSolid ? { border: 'solid', borderWidth: '1px' } : {}),
      }}
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
    >
      {text}
    </MuiButton>
  )
}

export default Button
