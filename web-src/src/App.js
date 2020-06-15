/*
* <license header>
*/

import React from 'react'; 
import WkfHtmlParser from './WkfHtmlParser'; 
import PropTypes from 'prop-types';
import ErrorBoundary from 'react-error-boundary';
import './App.css'

// Import root provider and theme
import {Provider} from '@react-spectrum/provider';
import {theme} from '@react-spectrum/theme-default';

// Import the needed components
import {Button} from '@react-spectrum/button';
import {Form} from '@react-spectrum/form';
import {Checkbox} from '@react-spectrum/checkbox';
import {TextField} from '@react-spectrum/textfield';

import { actionWebInvoke } from './utils'
import actions from './config.json'

/* Here is your entry point React Component, this class has access to the Adobe Experience Cloud Shell runtime object */

export default class App extends React.Component {
  constructor (props) {
    super(props)

    // error handler on UI rendering failure
    this.onError = (e, componentStack) => {}

    // component to show if UI fails rendering
    this.fallbackComponent = ({ componentStack, error }) => (
      <React.Fragment>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Something went wrong :(</h1>
        <pre>{ componentStack + '\n' + error.message }</pre>
      </React.Fragment>
    )

    this.state = {}

    // console.log('runtime object:', this.props.runtime)
    // console.log('ims object:', this.props.ims)
  }

  static get propTypes () {
    return {
      runtime: PropTypes.any,
      ims: PropTypes.any
    }
  }

  async invoke (action, params) {
    // set the authorization header and org from the ims props object
    const headers = {}
    if (this.props.ims.token) {
      headers.authorization = 'Bearer ' + this.props.ims.token
    }
    if (this.props.ims.org) {
      headers['x-org-id'] = this.props.ims.org
    }
    try {
      // invoke backend action
      const response = await actionWebInvoke(action, headers, params)
      // store the response
      this.setState({ response })
      console.log(`Response from ${action}:`, response)
    } catch (e) {
      // log and store any error message
      console.error(e)
      this.setState({ response: null, errorMsg: e.message })
    }
  }

  render () {
    const body = {
      // backgroundColor: "white"
    }
    return (
      // ErrorBoundary wraps child components to handle eventual rendering errors
      <ErrorBoundary onError={ this.onError } FallbackComponent={ this.fallbackComponent } >
        <Provider theme={theme} typekitId="mge7bvf">
          <div style={body}>
          <WkfHtmlParser/><br/>
          </div>
        </Provider>
      </ErrorBoundary>
    )
  }
}
