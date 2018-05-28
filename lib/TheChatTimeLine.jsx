'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheCondition } from 'the-condition'
import { formatDate } from 'the-date'
import { TheSpin } from 'the-spin'
import TheChatTimeLineItem from './TheChatTimeLineItem'

/**
 * Chat Time line
 */
class TheChatTimeLine extends React.Component {
  constructor (props) {
    super(props)
    this.scrollerRef = React.createRef()
    this.handleScroll = this.handleScroll.bind(this)
    this.autoFollow = true
  }

  componentDidMount () {
    const scroller = this.scrollerRef.current
    const {handleScroll} = this
    scroller.addEventListener('scroll', handleScroll)
  }

  componentDidUpdate () {
    const scroller = this.scrollerRef.current

    if (scroller) {
      if (this.autoFollow) {
        scroller.scrollTop = scroller.scrollHeight
      }
    }
  }

  componentWillUnmount () {
    const scroller = this.scrollerRef.current
    const {handleScroll} = this
    scroller.removeEventListener('scroll', handleScroll)
  }

  handleScroll (e) {
    const {offsetHeight, scrollHeight, scrollTop} = e.target || e.srcElement
    const reachTop = scrollTop === 0
    if (reachTop) {
      const {onScrollReachTop} = this.props
      onScrollReachTop && onScrollReachTop()
    }

    const fromBottom = (scrollHeight - offsetHeight) - scrollTop
    const reachBottom = fromBottom <= 0
    if (reachBottom) {
      const {onScrollReachBottom} = this.props
      onScrollReachBottom && onScrollReachBottom()
    }

    this.autoFollow = fromBottom < 80
  }

  render () {
    const {props} = this
    const {
      alt,
      children,
      className,
      empty = props.items && props.items.length === 0,
      items,
      lang,
      onWho,
      spinning,
      whoBaseColor,
      whoImageSize,
    } = props

    const groupedItems = items
      .reduce((grouped, item) => {
        const title = formatDate(item.at, 'LL', {lang})
        return Object.assign(grouped, {
          [title]: [...(grouped[title] || []), item],
        })
      }, {})
    return (
      <div {...htmlAttributesFor(props, {except: ['className']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-chat-time-line', className)}
      >
        <TheCondition if={!!spinning}>
          <TheSpin className='the-chat-time-line-spin'
                   cover
                   enabled
          />
        </TheCondition>
        <div className='the-chat-time-line-scroll'
             ref={this.scrollerRef}>
          <TheCondition if={empty}>
            <p className='the-chat-time-line-alt'>{alt}</p>
          </TheCondition>
          <div className='the-chat-time-line-content'>
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
                              key={title + 'id,at,text,image,video'.split(',').map((key) => item[key]).join('-')}
                              {...item}
                              {...{onWho, whoBaseColor, whoImageSize}}
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
}

TheChatTimeLine.propTypes = {
  /** Item data */
  /** Alt text */
  alt: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  /** Lang */
  lang: PropTypes.string,
  /** Handler when scroll reaches bottom */
  onScrollReachBottom: PropTypes.func,
  /** Handler when scroll reaches top */
  onScrollReachTop: PropTypes.func,
  /** Handler for who tap */
  onWho: PropTypes.func,
  /** Shows spin */
  spinning: PropTypes.bool,
  /** Base color of who */
  whoBaseColor: PropTypes.string,
  /** Size of who image */
  whoImageSize: PropTypes.number,
}

TheChatTimeLine.defaultProps = {
  alt: 'No chat yet',
  items: [],
  lang: 'en',
  onScrollReachBottom: null,
  onScrollReachTop: null,
  onWho: null,
  spinning: false,
  whoBaseColor: TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR,
  whoImageSize: TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE,
}

TheChatTimeLine.Item = 'TheChatTimeLineItem'

TheChatTimeLine.displayName = 'TheChatTimeLine'

export default TheChatTimeLine
