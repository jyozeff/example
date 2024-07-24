import React from 'react'
import MailIcon from '@mui/icons-material/Mail'

interface Props {
  onClick: () => void
  text: string
  style?: {
    [k: string]: string
  }
}

const baseStyle = {
  height: '50px',
  width: '240px',
  textAlign: 'center' as const,
  boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',
  fontSize: '15px',
  lineHeight: '48px',
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '10px',
  paddingRight: '10px',
  borderRadius: '4px',
  fontFamily: 'Roboto,arial,sans-serif',
  cursor: 'pointer',
  userSelect: 'none' as const,
  backgroundColor: '#fff',
}

export default function EmailButton(props: Props) {
  return (
    <div
      role="button"
      onClick={props.onClick}
      style={{ ...baseStyle, ...(props.style || {}) }}
    >
      <MailIcon
        style={{
          color: 'rgba(0, 0, 0, 0.54)',
          fontSize: 20,
          marginLeft: '10px',
        }}
      />
      <span style={{ color: 'rgba(0,0,0,.54)', flex: 1 }}>{props.text}</span>
    </div>
  )
}
