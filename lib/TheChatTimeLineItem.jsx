'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { colorWithText, textColorFor } from 'the-color'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheCondition } from 'the-condition'
import theDate from 'the-date'
import { TheImage } from 'the-image'
import { TheVideo } from 'the-video'

/**
 * Chat Time line item
 */
class TheChatTimeLineItem extends React.Component {
  render () {
    const {props} = this
    const {
      align,
      at,
      children,
      className,
      image,
      node,
      onWho,
      status,
      text,
      video,
      who,
      whoBaseColor,
      whoImageSize,
    } = props
    const {
      color: whoColor = colorWithText(who.name, {base: whoBaseColor}),
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
              'the-chat-time-line-item-clickable': !!onWho,
            })}
                      height={whoImageSize}
                      onClick={() => onWho && onWho(who)}
                      scale='fill'
                      src={who.image}
                      style={{
                        backgroundColor: whoColor,
                        borderColor: whoColor,
                        color: textColorFor(whoColor),
                      }}
                      width={whoImageSize}
            />
          </TheCondition>
          <TheCondition unless={!!who.image}>
            <div className={c('the-chat-time-line-item-who-image', {
              'the-chat-time-line-item-clickable': !!onWho,
            })}
                 onClick={() => onWho && onWho(who)}
                 style={{
                   backgroundColor: whoColor,
                   borderColor: whoColor,
                   color: textColorFor(whoColor),
                   height: `${whoImageSize}px`,
                   width: `${whoImageSize}px`,
                 }}
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
          <TheCondition if={!!node}>
            <div className='the-chat-time-line-item-content'>
              <div className='the-chat-time-line-item-node'>
                {node}
              </div>
            </div>
          </TheCondition>
          <TheCondition if={!!image}>
            <div className='the-chat-time-line-item-content'>
              <TheImage className='the-chat-time-line-item-image'
                        resizeInterval={400}
                        scale='fit'
                        width='100%'
                        {...(typeof image === 'string' ? {src: image} : image)}
              />
            </div>
          </TheCondition>
          <TheCondition if={!!video}>
            <div className='the-chat-time-line-item-content'>
              <TheVideo className='video'
                        controls
                        resizeInterval={400}
                        scale='fit'
                        width='100%'
                        {...(typeof video === 'string' ? {src: video} : video)}
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
              {theDate(at).format(TheChatTimeLineItem.TIME_FORMAT)}
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
  /** Content align */
  align: PropTypes.oneOf(['left', 'right']),
  at: PropTypes.instanceOf(Date).isRequired,
  /** Image Url */
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Handler for click who */
  onWho: PropTypes.func,
  /** Status text */
  status: PropTypes.string,
  /** Text */
  text: PropTypes.string,
  /** Video url */
  video: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Who posts */
  who: PropTypes.object.isRequired,
  /** Base color of who */
  whoBaseColor: PropTypes.string,
  /** Image size of who */
  whoImageSize: PropTypes.number,
}

TheChatTimeLineItem.defaultProps = {
  align: 'left',
  at: null,
  image: null,
  onWho: () => null,
  status: null,
  text: null,
  video: null,
  who: {},
  whoBaseColor: TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR,
  whoImageSize: TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE,
}

TheChatTimeLineItem.displayName = 'TheChatTimeLineItem'

TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE = 42
TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR = '#58E'
TheChatTimeLineItem.TIME_FORMAT = 'HH:mm'

export default TheChatTimeLineItem
