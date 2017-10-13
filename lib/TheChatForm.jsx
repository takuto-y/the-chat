'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { TheForm } from 'the-form'
import { TheInput } from 'the-input'
import { TheButton } from 'the-button'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Chat UI of the-components
 */
class TheChatForm extends React.Component {
  render () {
    const s = this
    const {props} = s
    const {
      className,
      children,
      values,
      submitText
    } = props
    return (
      <div {...htmlAttributesFor(props, {except: ['className']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-chat-form', className)}
      >
        {children}
        <TheForm inline
                 className='the-chat-form-form'
        >

          <TheInput.TextArea name='text'
                             value={values['text']}
                             onUpdate={(v) => s.handleUpdate(v)}
                             onKeyDown={(e) => s.handleKeyDown(e)}
                             rows={2}
          />
          <TheButton primary
                     onSubmit={() => s.handleSubmit()}>
            {submitText}
          </TheButton>
        </TheForm>
      </div>
    )
  }

  handleKeyDown (e) {
    const s = this
    const isSubmit = e.keyCode === 13 && (e.shiftKey || e.metaKey)
    if (isSubmit) {
      s.handleSubmit()
    }
  }

  handleUpdate (values) {
    const s = this
    const {onUpdate} = s.props
    onUpdate && onUpdate(values)
  }

  handleSubmit () {
    const s = this
    const {onSubmit, values} = s.props
    const {text} = values
    if (!text) {
      return
    }
    onSubmit && onSubmit(values)
  }
}

TheChatForm.propTypes = {
  /** Form values */
  values: PropTypes.object.isRequired,
  /** Handler for value update */
  onUpdate: PropTypes.func.isRequired,
  /** Handler for value submit */
  onSubmit: PropTypes.func.isRequired,
  /** Text for submit */
  submitText: PropTypes.string,
}

TheChatForm.defaultProps = {
  values: {},
  onUpdate: () => null,
  onSubmit: () => null,
  submitText: 'Send',
}

TheChatForm.displayName = 'TheChatForm'

export default TheChatForm
