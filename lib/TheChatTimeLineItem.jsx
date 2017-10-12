'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { TheImage } from 'the-image'
import { TheVideo } from 'the-video'
import { TheCondition } from 'the-condition'
import { formatDate } from 'the-date'
import { textColorFor } from 'the-color'
import c from 'classnames'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Chat Time line item
 */
class TheChatTimeLineItem extends React.Component {
  render () {
    const s = this
    const {props} = s
    const {
      className,
      children,
      at,
      text,
      image,
      video,
      who,
      whoImageSize,
      status,
      align
    } = props
    const {color: whoColor = '#CCC'} = who
    return (
      <div {...htmlAttributesFor(props, {except: ['className']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-chat-time-line-item', className, {
             'the-chat-time-line-item-left': align === 'left',
             'the-chat-time-line-item-right': align === 'right',
           })}
      >
        <div className='the-chat-time-line-item-col the-chat-time-line-item-col-who'>
          <TheCondition if={!!who.image}>
            <TheImage className='the-chat-time-line-item-who-image'
                      src={who.image}
                      width={whoImageSize}
                      height={whoImageSize}
                      scale='fill'
                      style={{
                        backgroundColor: whoColor,
                        borderColor: whoColor,
                        color: textColorFor(whoColor),
                      }}
            />
          </TheCondition>
          <TheCondition unless={!!who.image}>
            <div className='the-chat-time-line-item-who-image'
                 src={who.image}
                 width={whoImageSize}
                 height={whoImageSize}
                 style={{
                   backgroundColor: whoColor,
                   borderColor: whoColor,
                   color: textColorFor(whoColor),
                   width: `${whoImageSize}px`,
                   height: `${whoImageSize}px`,
                 }}
            >
              {who.initial || who.name}
            </div>
          </TheCondition>
        </div>
        <div className='the-chat-time-line-item-col'>
          <div className='the-chat-time-line-item-who-name'>{who.name}</div>
          <TheCondition if={!!text}>
            <div className='the-chat-time-line-item-content'>
              <div className='the-chat-time-line-item-text'>
                <div className='the-chat-time-line-item-text-tail'/>
                <div>
                  {
                    (text || '').split('\n').reduce((lines, line, i) => [
                      ...lines,
                      lines.length > 0 ? <br key={i}/> : null,
                      line
                    ].filter(Boolean), [])
                  }
                </div>
              </div>
            </div>
          </TheCondition>
          <TheCondition if={!!image}>
            <div className='the-chat-time-line-item-content'>
              <TheImage src={image}
                        width={'100%'}
                        className='the-chat-time-line-item-image'
              />
            </div>
          </TheCondition>
          <TheCondition if={!!video}>
            <div className='the-chat-time-line-item-content'>
              <TheVideo src={video}
                        width={'100%'}
                        className='video'
              />
            </div>
          </TheCondition>
          {children}
        </div>
        <div className='the-chat-time-line-item-col the-chat-time-line-item-col-state'>
          <div>

          </div>
          <div>
            <div className='the-chat-time-line-item-state'>
              {status}
            </div>
            <div className='the-chat-time-line-item-date'>
              {formatDate(at, 'hh:mm')}
            </div>
          </div>
        </div>
        <div className='the-chat-time-line-item-col the-chat-time-line-item-col-spacer'>
        </div>
      </div>
    )
  }
}

TheChatTimeLineItem.propTypes = {
  /** Date of the item */
  at: PropTypes.instanceOf(Date).isRequired,
  /** Text */
  text: PropTypes.string,
  /** Who posts */
  who: PropTypes.object.isRequired,
  /** Image Url */
  image: PropTypes.string,
  /** Video url */
  video: PropTypes.string,
  /** Status text */
  status: PropTypes.string,
  /** Image size of who */
  whoImageSize: PropTypes.number,
  /** Content align */
  align: PropTypes.oneOf(['left', 'right'])
}

TheChatTimeLineItem.defaultProps = {
  at: null,
  text: null,
  status: null,
  who: {},
  image: null,
  video: null,
  whoImageSize: 48,
  align: 'left'
}

TheChatTimeLineItem.displayName = 'TheChatTimeLineItem'

export default TheChatTimeLineItem
