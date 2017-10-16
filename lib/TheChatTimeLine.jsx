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
    s.scrollElm = null
    s.handleScroll = s.handleScroll.bind(s)
    s.autoFollow = true
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
      onWho,
      whoImageSize
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
      >
        <TheCondition if={!!spinning}>
          <TheSpin cover
                   enabled
                   className='the-chat-time-line-spin'
          />
        </TheCondition>
        <div className='the-chat-time-line-scroll'>
          <div className='the-chat-time-line-content'
               ref={(scrollElm) => { s.scrollElm = scrollElm }}>
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
                              {...{onWho, whoImageSize}}
                            />
                          ))
                      }
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const s = this
    const {scrollElm, handleScroll} = s
    scrollElm.addEventListener('scroll', handleScroll)
  }

  componentDidUpdate () {
    const s = this
    const {scrollElm} = s

    if (scrollElm) {
      if (s.autoFollow) {
        scrollElm.scrollTop = scrollElm.scrollHeight
      }
    }
  }

  componentWillUnmount () {
    const s = this
    const {scrollElm, handleScroll} = s
    scrollElm.removeEventListener('scroll', handleScroll)
  }

  handleScroll (e) {
    const s = this
    const {scrollHeight, offsetHeight, scrollTop} = e.target || e.srcElement
    const reachTop = scrollTop === 0
    if (reachTop) {
      const {onScrollReachTop} = s.props
      onScrollReachTop && onScrollReachTop()
    }

    const fromBottom = (scrollHeight - offsetHeight) - scrollTop
    const reachBottom = fromBottom <= 0
    if (reachBottom) {
      const {onScrollReachBottom} = s.props
      onScrollReachBottom && onScrollReachBottom()
    }

    s.autoFollow = fromBottom < 80
  }
}

TheChatTimeLine.propTypes = {
  /** Shows spin */
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
  onWho: PropTypes.func,
  /** Size of who image */
  whoImageSize: PropTypes.number
}

TheChatTimeLine.defaultProps = {
  spinning: false,
  items: [],
  lang: 'en',
  onScrollReachTop: null,
  onScrollReachBottom: null,
  onWho: null,
  whoImageSize: TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE,
}

TheChatTimeLine.Item = 'TheChatTimeLineItem'

TheChatTimeLine.displayName = 'TheChatTimeLine'

export default TheChatTimeLine
