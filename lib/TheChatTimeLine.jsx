'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { formatDate } from 'the-date'
import { TheSpin } from 'the-spin'
import { TheCondition } from 'the-condition'
import TheChatTimeLineItem from './TheChatTimeLineItem'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Chat Time line
 */
class TheChatTimeLine extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.elm = null
    s.handleScroll = s.handleScroll.bind(s)

  }

  render () {
    const s = this
    const {props} = s
    const {
      spinning,
      className,
      children,
      items,
      lang,
      onWho
    } = props

    const groupedItems = items
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
           ref={(elm) => { s.elm = elm }}
      >
        <TheCondition if={!!spinning}>
          <TheSpin cover
                   enabled
                   className='the-chat-time-line-spin'
          />
        </TheCondition>
        <div className='the-chat-time-line-inner'>
          {children}
          {
            Object.keys(groupedItems)
              .sort((a, b) => new Date(b) - new Date(a))
              .map((title) => (
                <div className='the-chat-time-line-group' key={title}>
                  <div className='the-chat-time-line-group-header'>
                    <h5 className='the-chat-time-line-group-title'>
                      {title}
                    </h5>
                  </div>
                  <div className='the-chat-time-line-group-body'>
                    {
                      groupedItems[title]
                        .sort((a, b) => a.at - b.at)
                        .map((item) => (
                          <TheChatTimeLineItem
                            key={title + 'at,text,image,video'.split(',').map((key) => item[key]).join('-')}
                            {...item}
                            {...{onWho}}
                          />
                        ))
                    }
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    const s = this
    const {elm, handleScroll} = s
    elm.addEventListener('scroll', handleScroll)
  }

  componentWillUnmount () {
    const s = this
    const {elm, handleScroll} = s
    elm.removeEventListener('scroll', handleScroll)
  }

  handleScroll (e) {
    const s = this
    const {scrollHeight, offsetHeight, scrollTop} = e.srcElement
    const reachTop = scrollTop === 0
    if (reachTop) {
      const {onScrollReachTop} = s.props
      onScrollReachTop && onScrollReachTop()
    }

    const reachBottom = scrollHeight - offsetHeight <= scrollTop
    if (reachBottom) {
      const {onScrollReachBottom} = s.props
      onScrollReachBottom && onScrollReachBottom()
    }

    s.scrollTop = scrollTop

  }
}

TheChatTimeLine.propTypes = {
  /** Show spinner */
  spinning: PropTypes.bool,
  /** Item data */
  items: PropTypes.arrayOf(PropTypes.object),
  /** Lang */
  lang: PropTypes.string,

  /** Handler when scroll reaches top */
  onScrollReachTop: PropTypes.func,
  /** Handler when scroll reaches bottom */
  onScrollReachBottom: PropTypes.func,
  /** Handler for who tap */
  onWho: PropTypes.func
}

TheChatTimeLine.defaultProps = {
  spinning: false,
  items: [],
  lang: 'en',
  onScrollReachTop: null,
  onScrollReachBottom: null,
  onWho: null
}

TheChatTimeLine.Item = 'TheChatTimeLineItem'

TheChatTimeLine.displayName = 'TheChatTimeLine'

export default TheChatTimeLine
