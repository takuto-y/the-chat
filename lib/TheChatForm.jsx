'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheButton } from 'the-button'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheForm } from 'the-form'
import { TheInput } from 'the-input'

/**
 * Chat UI of the-components
 */
class TheChatForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleKeyDown (e) {
    const isSubmit = e.keyCode === 13 && (e.shiftKey || e.metaKey)
    if (isSubmit) {
      this.handleSubmit()
    }
  }

  handleSubmit () {
    const {onSubmit, values} = this.props
    const {text} = values
    if (!text) {
      return
    }
    onSubmit && onSubmit(values)
  }

  handleUpdate (values) {
    const {onUpdate} = this.props
    onUpdate && onUpdate(values)
  }

  render () {
    const {props} = this
    const {
      children,
      className,
      disabled,
      minLength,
      submitText,
      values,
    } = props
    const canSubmit = (values['text'] || '').trim().length >= minLength
    return (
      <div {...htmlAttributesFor(props, {except: ['className']})}
           {...eventHandlersFor(props, {except: []})}
           className={c('the-chat-form', className)}
      >
        {children}
        <TheForm className='the-chat-form-form'
                 inline
        >

          <TheInput.TextArea disabled={disabled}
                             name='text'
                             onKeyDown={this.handleKeyDown}
                             onUpdate={this.handleUpdate}
                             rows={2}
                             value={values['text']}
          />
          <TheButton disabled={!canSubmit || disabled}
                     onSubmit={this.handleSubmit}
                     primary>
            {submitText}
          </TheButton>
        </TheForm>
      </div>
    )
  }
}

TheChatForm.propTypes = {
  /** Disabled attribute */
  disabled: PropTypes.bool,
  /** Minimum text length */
  minLength: PropTypes.number,
  /** Handler for value submit */
  onSubmit: PropTypes.func.isRequired,
  /** Handler for value update */
  onUpdate: PropTypes.func.isRequired,
  /** Text for submit */
  submitText: PropTypes.string,
  /** Form values */
  values: PropTypes.object.isRequired,
}

TheChatForm.defaultProps = {
  disabled: false,
  minLength: 1,
  onSubmit: () => null,
  onUpdate: () => null,
  submitText: 'Send',
  values: {},
}

TheChatForm.displayName = 'TheChatForm'

export default TheChatForm
