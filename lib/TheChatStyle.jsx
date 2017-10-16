'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import TheStyle from 'the-style'
import { asStyleData } from 'the-component-util'

/** Style for TheChat */
const TheChatStyle = ({id, className, options}) => (
  <TheStyle {...{id}}
            className={c('the-chat-style', className)}
            styles={TheChatStyle.data(options)}
  />
)

TheChatStyle.displayName = 'TheChatStyle'
TheChatStyle.propTypes = {
  /** Style options */
  options: PropTypes.object
}

TheChatStyle.defaultProps = {
  options: {}
}

TheChatStyle.data = (options) => {
  const {ThemeValues} = TheStyle
  const {
    dominantColor = ThemeValues.dominantColor,
    backgroundForLeftText = '#F0F0F0',
    backgroundForRightText = '#808080',
    lightBorderColor = ThemeValues.lightBorderColor,
    backgroundColor = ThemeValues.backgroundColor,
    textColor = ThemeValues.textColor,
  } = options
  return asStyleData('.the-chat', {
    '&': {
      position: 'relative',
      borderRadius: '2px',
      background: backgroundColor,
      padding: 0,
      boxSizing: 'border-box'
    },
    '.the-chat-time-line': {
      display: 'block',
      position: 'relative',
      boxSizing: 'border-box'
    },
    '.the-chat-time-line-spin': {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 4
    },
    '.the-chat-time-line-scroll': {
      display: 'block',
      overflow: 'auto',
      height: '100%'
    },
    '.the-chat-time-line-content': {
      display: 'flex',
      flexDirection: 'column-reverse',
      background: backgroundColor,
      padding: '8px 0',
      boxSizing: 'border-box',
      position: 'relative'
    },
    '.the-chat-time-line-group': {
      display: 'block',
      position: 'relative',
      flex: 0
    },
    '.the-chat-time-line-group-header': {
      display: 'block',
      position: 'sticky',
      textAlign: 'center',
      top: 0,
      zIndex: 1
    },
    '.the-chat-time-line-group-title': {
      backgroundColor: 'rgba(0,0,0,0.2)',
      color: 'white',
      borderRadius: '7px',
      fontSize: '8px',
      padding: '0 8px',
      lineHeight: '14px',
      fontWeight: 'normal',
      display: 'inline-block',
      margin: '4px 0'
    },
    '.the-chat-time-line-group-body': {
      display: 'block'
    },
    '.the-chat-time-line-item': {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: '8px 0',
      '.the-image.the-image-fit .the-image-img': {
        height: 'auto'
      },

      '.the-video .the-video-inner': {
        height: 'auto'
      },
      '.the-video .the-video-video': {}
    },
    '.the-chat-time-line-item-left': {
      '.the-chat-time-line-item-text-tail': {
        left: '-4px'
      }
    },
    '.the-chat-time-line-item-right': {
      flexDirection: 'row-reverse',
      textAlign: 'right',
      '.the-chat-time-line-item-who-name': {
        height: 0,
        overflow: 'hidden',
        opacity: 0
      },
      '.the-chat-time-line-item-text': {
        backgroundColor: backgroundForRightText,
        color: 'white',
        display: 'inline-block'
      },
      '.the-chat-time-line-item-text-tail': {
        backgroundColor: backgroundForRightText,
        right: '-4px',
        top: '16px'
      }
    },
    '.the-chat-time-line-item-col': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    '.the-chat-time-line-item-col-spacer': {
      width: '72px'
    },
    '.the-chat-time-line-item-col-who': {
      flexShrink: 0,
      padding: '0 4px',
      fontSize: 'x-small',
      boxSizing: 'border-box'
    },
    '.the-chat-time-line-item-col-state': {
      flexShrink: 0,
      padding: '0 4px',
      fontSize: 'x-small',
      boxSizing: 'border-box'
    },
    '.the-chat-time-line-item-who-name': {
      fontSize: 'small',
      display: 'inline-block'
    },
    '.the-chat-time-line-item-who-image': {
      maxWidth: '100%',
      borderRadius: '50%',
      border: '2px solid #CCC',
      margin: '4px',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.the-chat-time-line-item-clickable': {
      cursor: 'pointer'
    },
    '.the-chat-time-line-item-content': {
      marginBottom: '8px'
    },
    '.the-chat-time-line-item-text': {
      display: 'block',
      borderRadius: '4px',
      background: backgroundForLeftText,
      color: textColor,
      boxSizing: 'border-box',
      padding: '8px',
      position: 'relative',
      fontSize: 'smaller'
    },
    '.the-chat-time-line-item-text-tail': {
      position: 'absolute',
      width: '8px',
      height: '8px',
      transform: 'rotate(45deg)',
      top: '10px',
      backgroundColor: backgroundForLeftText
    },
    '.the-chat-time-line-item-image': {
      maxWidth: '100%',
      borderRadius: '4px'
    },
    '.the-chat-time-line-item-video': {
      maxWidth: '100%',
      borderRadius: '4px'
    },
    '.the-chat-time-line-item-date': {
      lineHeight: '1em',
      marginBottom: '8px'
    },
    '.the-chat-form': {
      display: 'flex',
      justifyContent: 'flex-end'

    },
    '.the-chat-form-form': {
      width: '100%',
      margin: 0,
      padding: 0
    }
  })
}

export default TheChatStyle
