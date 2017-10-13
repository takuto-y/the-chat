'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import TheChatStyle from './TheChatStyle'
import TheChatForm from './TheChatForm'
import TheChatTimeLine from './TheChatTimeLine'
import TheChatTimeLineItem from './TheChatTimeLineItem'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Chat UI of the-components
 */
class TheChat extends React.Component {
  render () {
    const s = this
    const {props} = s
    const {
      className,
      children
    } = props
    return (
      <div {...htmlAttributesFor(props, {except: ['className']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-chat', className)}
      >
        {children}
      </div>
    )
  }
}

TheChat.Style = TheChatStyle
TheChat.Form = TheChatForm
TheChat.TimeLine = TheChatTimeLine
TheChat.TimeLineItem = TheChatTimeLineItem

TheChat.propTypes = {}

TheChat.defaultProps = {}

TheChat.displayName = 'TheChat'

export default TheChat
