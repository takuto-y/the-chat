'use strict'

import React from 'react'
import { TheChat, TheChatStyle } from 'the-chat'
import { TheImageStyle } from 'the-image'
import { TheVideoStyle } from 'the-video'

const images = [
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/03.jpg'
]

class ExampleComponent extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s._timer = null
    s.state = {
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
          image: images[2],
          who: {
            name: 'John',
            image: images[1]
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
        <TheImageStyle/>
        <TheChatStyle/>
        <TheChat>
          <TheChat.TimeLine style={{
            height: '300px',
            border: '4px solid #333'
          }}
                            items={items}/>
        </TheChat>
      </div>

    )
  }

  componentDidMount () {
    const s = this
    s._timer = setInterval(() => {
      const {items} = s.state
      s.setState({
        items: [...items, {
          at: new Date(),
          text: 'Say hoo!',
          who: {
            color: '#38E',
            name: 'hoge',
            initial: 'H'
          }
        }]
      })
    }, 5000)
  }

  componentWillUnmount () {
    const s = this
    clearInterval(s._timer)
  }
}

export default ExampleComponent
