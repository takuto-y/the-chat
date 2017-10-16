'use strict'

import React from 'react'
import { TheChat, TheChatStyle } from 'the-chat'
import { TheImageStyle } from 'the-image'
import { TheInputStyle } from 'the-input'
import { TheButtonStyle } from 'the-button'
import { TheVideoStyle } from 'the-video'
import { TheSpinStyle } from 'the-spin'
import { TheFormStyle } from 'the-form'

const images = [
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/03.jpg'
]

const videos = [
  './mov_bbb.mp4'
]

class ExampleComponent extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s._timer = null
    s.state = {
      form: {},
      items: [
        {
          at: new Date('2017/10/01 12:34'),
          text: 'This is the first post from John',
          who: {
            name: 'John',
            image: images[0]
          }
        },
        {
          at: new Date('2017/10/02 12:34'),
          text: 'This is the second post from John',
          who: {
            name: 'John',
            image: images[0]
          }
        },
        {
          at: new Date('2017/10/03 12:34'),
          text: 'This is the third post from John',
          who: {
            name: 'John',
            image: images[0]
          }
        },
        {
          at: new Date('2017/10/08 12:38'),
          video: videos[0],
          who: {
            name: 'John The Video',
            video: videos[0],
            image: images[1],
          }
        },
        {
          at: new Date('2017/10/08 14:38'),
          image: images[2],
          align: 'right',
          text: `This is an text\n hoge fuge fuge`,
          status: 'Read',
          who: {
            name: 'hoge',
          }
        },
        {
          at: new Date('2017/10/08 14:38'),
          image: images[2],
          align: 'right',
          who: {
            name: 'hoge',
            image: images[0]
          }
        },
      ]
    }
  }

  render () {
    const s = this
    const {items} = s.state
    return (
      <div>
        <TheVideoStyle/>
        <TheButtonStyle/>
        <TheInputStyle/>
        <TheImageStyle/>
        <TheSpinStyle/>
        <TheFormStyle/>
        <TheChatStyle/>
        <TheChat>
          <TheChat.TimeLine style={{
            height: '300px',
            border: '4px solid #333'
          }}
                            items={items}
                            onWho={(who) => console.log('who selected', who)}
          />
          <TheChat.Form onUpdate={(form) => s.setState({form})}
                        values={s.state.form}
                        onSubmit={() => s.setState({
                          form: {},
                          items: [...s.state.items, {
                            at: new Date(),
                            text: s.state.form.text,
                            align: 'right',
                            who: {
                              name: 'Me',
                              color: '#33A'
                            }
                          }]
                        })}
          />
        </TheChat>
      </div>

    )
  }

  componentDidMount () {
    const s = this
    s._timer = setInterval(() => {
      const {items} = s.state
      if (window.DISABLE_THE_CHAT_PUSH) {
        return
      }
      s.setState({
        items: [...items, {
          at: new Date(),
          text: 'Say hoo!',
          who: {
            name: 'hoge',
            initial: 'H'
          }
        }]
      })
      console.log('item added')
    }, 5000)
  }

  componentWillUnmount () {
    const s = this
    clearInterval(s._timer)
  }
}

export default ExampleComponent
