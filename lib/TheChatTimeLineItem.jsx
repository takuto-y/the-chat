'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { TheImage } from 'the-image'
import { TheVideo } from 'the-video'
import { TheCondition } from 'the-condition'
import { formatDate } from 'the-date'
import { textColorFor, colorWithText } from 'the-color'
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
      whoBaseColor,
      status,
      align,
      onWho
    } = props
    const {
      color: whoColor = colorWithText(who.name, {base: whoBaseColor})
    } = who
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
            <TheImage className={c('the-chat-time-line-item-who-image', {
              'the-chat-time-line-item-clickable': !!onWho
            })}
                      src={who.image}
                      width={whoImageSize}
                      height={whoImageSize}
                      scale='fill'
                      style={{
                        backgroundColor: whoColor,
                        borderColor: whoColor,
                        color: textColorFor(whoColor),
                      }}
                      onClick={() => onWho && onWho(who)}
            />
          </TheCondition>
          <TheCondition unless={!!who.image}>
            <div className={c('the-chat-time-line-item-who-image', {
              'the-chat-time-line-item-clickable': !!onWho
            })}
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
                 onClick={() => onWho && onWho(who)}
            >
              {who.initial || who.name}
            </div>
          </TheCondition>
        </div>
        <div className='the-chat-time-line-item-col'>
          <div className='the-chat-time-line-item-who-name'
               onClick={() => onWho && onWho(who)}
          >{who.name}</div>
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
                        scale='fit'
                        className='the-chat-time-line-item-image'
                        resizeInterval={400}
              />
            </div>
          </TheCondition>
          <TheCondition if={!!video}>
            <div className='the-chat-time-line-item-content'>
              <TheVideo src={video}
                        controls
                        width={'100%'}
                        scale='fit'
                        className='video'
                        resizeInterval={400}
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
  /** Base color of who */
  whoBaseColor: PropTypes.string,
  /** Image size of who */
  whoImageSize: PropTypes.number,
  /** Content align */
  align: PropTypes.oneOf(['left', 'right']),
  /** Handler for click who */
  onWho: PropTypes.func
}

TheChatTimeLineItem.defaultProps = {
  at: null,
  text: null,
  status: null,
  who: {},
  image: null,
  video: null,
  whoBaseColor: TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR,
  whoImageSize: TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE,
  align: 'left',
  onWho: () => null
}

TheChatTimeLineItem.displayName = 'TheChatTimeLineItem'

TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE = 42
TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR = '#58E'

export default TheChatTimeLineItem
