import React from 'react'

import { GlobalBlock } from '../../../src/components/layout'

import { Row, Col, Form, Input, Button } from 'antd'
import Link from 'next/link'
import { ActionContainer } from './grapgql'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const LoginForm = props => {
  const { getFieldDecorator } = props.form
  return (
    <GlobalBlock.Consumer>
      {result => {
        if (!process.browser) {
          return <div />
        }
        const { loginState } = result

        return (
          <ActionContainer>
            {({ loginAction }) => {
              const handleLogin = resultX => () => {
                resultX.form.validateFields(async (err, values) => {
                  if (!err) {
                    await loginAction.mutation({ variables: values })

                    loginState.setState({ loggedIn: true })
                  }
                })
              }

              return (
                <Form className="login-form" resetFields={true}>
                  <FormItem {...formItemLayout} label="email">
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          required: true,
                          message: 'please input your email'
                        }
                      ]
                    })(<Input placeholder="please input your email" />)}
                  </FormItem>

                  <FormItem {...formItemLayout} label="password">
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'please input your password'
                        }
                      ]
                    })(
                      <Input
                        type="password"
                        placeholder="please input your password"
                      />
                    )}
                  </FormItem>

                  <Row>
                    <Col span={14} style={{ textAlign: 'right' }}>
                      {loginAction.result.error ? (
                        <label style={{ marginRight: '20px', color: 'red' }}>
                          {loginAction.result.error.message}
                        </label>
                      ) : (
                        ''
                      )}

                      <Button
                        type="primary"
                        style={{ marginRight: 15 }}
                        onClick={handleLogin({ form: props.form, loginAction })}
                      >
                        Login{' '}
                      </Button>

                      <Link href="/presonal/signup" style={{ marginLeft: 8 }}>
                        <a>Forward SignUp</a>
                      </Link>
                    </Col>
                  </Row>
                </Form>
              )
            }}
          </ActionContainer>
        )
      }}
    </GlobalBlock.Consumer>
  )
}

export default Form.create()(LoginForm)