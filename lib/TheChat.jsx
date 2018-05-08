'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import TheChatForm from './TheChatForm'
import TheChatStyle from './TheChatStyle'
import TheChatTimeLine from './TheChatTimeLine'
import TheChatTimeLineItem from './TheChatTimeLineItem'

/**
 * Chat UI of the-components
 */
class TheChat extends React.Component {
  render () {
    const {props} = this
    const {
      children,
      className,
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
