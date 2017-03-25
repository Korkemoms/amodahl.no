import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import DocumentTitle from 'react-document-title'
import queryString from 'query-string'

import {
  Grid,
  Table,
  PageHeader,
  Button
} from 'react-bootstrap'

/* Purely presentational component */
export default class SignereLogin extends React.Component {

  render () {
    const urlParameters = queryString.parse(location.search)

    let loginButton
    if (urlParameters.signereRequestId) {
      loginButton = <Button
        bsStyle='primary'
        onClick={() => {
          this.props.login({
            type: 'signere',
            signereRequestId: urlParameters.signereRequestId
          })
        }}>
            Log in with Signere (stage 2)
          </Button>
    } else if (!this.props.url) {
      loginButton = <Button
        bsStyle='primary'
        onClick={() => {
          this.props.login({
            type: 'signere',
            navigate: this.props.navigate
          })
        }}>
            Log in with Signere (stage 1)
          </Button>
    }

    const content = this.props.url
     ? <div>
       <iframe style={{width: '100%', height: '400px', border: '0'}} src={this.props.url} />
       <PageHeader>Test users</PageHeader>
       <Table striped bordered condensed hover>
         <thead>
           <tr>
             <th>Social security number</th>
             <th>Name</th>
             <th>One time code</th>
             <th>Password</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>11080258625</td>
             <td>Gates, Bill</td>
             <td>otp</td>
             <td>qwer1234</td>
           </tr>
           <tr>
             <td>02038073735</td>
             <td>Musk, Elon</td>
             <td>otp</td>
             <td>qwer1234</td>
           </tr>
           <tr>
             <td>02035031930</td>
             <td>Jobs, Steve</td>
             <td>otp</td>
             <td>qwer1234</td>
           </tr>
           <tr>
             <td>18120112345</td>
             <td >Pan, Peter</td>
             <td>otp</td>
             <td>qwer1234</td>
           </tr>
         </tbody>
       </Table>
     </div>
    : null

    return (
      <DocumentTitle title='Signere log in'>
        <div>
          <MyHeader headline='Log in with signere.no' />
          <div className='mycontent'>
            <Grid>
              {loginButton}
              {content}
            </Grid>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
