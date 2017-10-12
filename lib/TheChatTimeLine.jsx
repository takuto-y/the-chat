'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { formatDate } from 'the-date'
import TheChatTimeLineItem from './TheChatTimeLineItem'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Chat Time line
 */
class TheChatTimeLine extends React.Component {
  render () {
    const s = this
    const {props} = s
    const {
      className,
      children,
      items,
      lang
    } = props

    const groupedItems = items
      .sort((a, b) => b.at - a.at)
      .reduce((grouped, item) => {
        const title = formatDate(item.at, 'LL', {lang})
        return Object.assign(grouped, {
          [title]: [...(grouped[title] || []), item]
        })
      }, {})
    return (
      <div {...htmlAttributesFor(props, {except: ['className']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-chat-time-line', className)}
      >
        {children}
        {
          Object.keys(groupedItems).map((title) => (
            <div className='the-chat-time-line-group' key={title}>
              <div className='the-chat-time-line-group-header'>
                <h5 className='the-chat-time-line-group-title'>
                  {title}
                </h5>
              </div>
              <div className='the-chat-time-line-group-body'>
                {
                  groupedItems[title].map((item) => (
                    <TheChatTimeLineItem
                      key={title + 'at,text,image,video'.split(',').map((key) => item[key]).join('-')}
                      {...item}/>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

TheChatTimeLine.propTypes = {
  /** Item data */
  items: PropTypes.arrayOf(PropTypes.object),
  /** Lang */
  lang: PropTypes.string
}

TheChatTimeLine.defaultProps = {
  items: [],
  lang: 'en'
}

TheChatTimeLine.Item = 'TheChatTimeLineItem'

TheChatTimeLine.displayName = 'TheChatTimeLine'

export default TheChatTimeLine
