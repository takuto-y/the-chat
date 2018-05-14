the-chat
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/the-labo/the-chat
[bd_travis_url]: http://travis-ci.org/the-labo/the-chat
[bd_travis_shield_url]: http://img.shields.io/travis/the-labo/the-chat.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/the-labo/the-chat
[bd_travis_com_shield_url]: https://api.travis-ci.com/the-labo/the-chat.svg?token=
[bd_license_url]: https://github.com/the-labo/the-chat/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/the-labo/the-chat
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/the-labo/the-chat.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/the-labo/the-chat.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/the-labo/the-chat
[bd_gemnasium_shield_url]: https://gemnasium.com/the-labo/the-chat.svg
[bd_npm_url]: http://www.npmjs.org/package/the-chat
[bd_npm_shield_url]: http://img.shields.io/npm/v/the-chat.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Chat UI of the-components

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install the-chat --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
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
    this._timer = null
    this.state = {
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
          node: <span>This is the third post from John</span>,
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
    const {items} = this.state
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
          <TheChat.Form onUpdate={(form) => this.setState({form})}
                        values={this.state.form}
                        onSubmit={() => this.setState({
                          form: {},
                          items: [...this.state.items, {
                            at: new Date(),
                            text: this.state.form.text,
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
    this._timer = setInterval(() => {
      const {items} = this.state
      if (window.DISABLE_THE_CHAT_PUSH) {
        return
      }
      this.setState({
        items: [...items, {
          at: new Date(),
          text: 'Say hoo!',
          align: this.state.items.length % 2 ? 'left' : 'right',
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
    clearInterval(this._timer)
  }
}

export default ExampleComponent

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.Components.md.hbs" Start -->

<a name="section-doc-guides-03-components-md"></a>

Components
-----------

### TheChat

Chat UI of the-components


### TheChatForm

Chat UI of the-components

**Props**

| Name | Type | Description | Default |
| --- | --- | ---- | ---- |
| `onSubmit` | func  | Handler for value submit | `() => null` |
| `onUpdate` | func  | Handler for value update | `() => null` |
| `submitText` | string  | Text for submit | `'Send'` |
| `values` | object  |  | `{}` |

### TheChatStyle

Style for TheChat

**Props**

| Name | Type | Description | Default |
| --- | --- | ---- | ---- |
| `options` | object  | Style options | `{}` |

### TheChatTimeLine

Chat Time line

**Props**

| Name | Type | Description | Default |
| --- | --- | ---- | ---- |
| `items` | arrayOf object | Item data | `[]` |
| `lang` | string  | Lang | `'en'` |
| `onScrollReachBottom` | func  | Handler when scroll reaches bottom | `null` |
| `onScrollReachTop` | func  | Handler when scroll reaches top | `null` |
| `onWho` | func  | Handler for who tap | `null` |
| `spinning` | bool  |  | `false` |
| `whoBaseColor` | string  | Base color of who | `TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR` |
| `whoImageSize` | number  | Size of who image | `TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE` |

### TheChatTimeLineItem

Chat Time line item

**Props**

| Name | Type | Description | Default |
| --- | --- | ---- | ---- |
| `align` | enum  | Content align | `'left'` |
| `at` | instanceOf  |  | `null` |
| `image` | string  | Image Url | `null` |
| `onWho` | func  | Handler for click who | `() => null` |
| `status` | string  | Status text | `null` |
| `text` | string  | Text | `null` |
| `video` | string  | Video url | `null` |
| `who` | object  | Who posts | `{}` |
| `whoBaseColor` | string  | Base color of who | `TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR` |
| `whoImageSize` | number  | Image size of who | `TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE` |



<!-- Section from "doc/guides/03.Components.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/the-labo/the-chat/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [THE Labo][t_h_e_labo_url]

[t_h_e_labo_url]: https://github.com/the-labo

<!-- Links End -->
