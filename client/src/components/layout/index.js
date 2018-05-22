import React from 'react'
import { Avatar, Layout, Icon, Row, Col } from 'antd'
import { adopt } from 'react-adopt'
import { Toggle, Value, State } from 'react-powerplug'

import Nav from '../nav'
const { Header, Content, Sider } = Layout

const AdoptContainer = adopt({
  toggleMenuModal: <Toggle initial={false} />,
  token: <Value initial={''} />,
  loginState: <State initial={{ loggedIn: false }} />
})
export const GlobalBlock = React.createContext()

export default props => (
  <AdoptContainer>
    {({ toggleMenuModal, loginState }) => {
      let loginblock = {}

      const handleLogout = resultX => {
        resultX.e.preventDefault()
        // fetch('http://localhost:8080/auth/logout', {
        //   method: 'post',
        //   credentials: 'include'
        // })
        //   .then(({ status }) => {
        //     if (status === 200) {
        //       loginState.setState({ loggedIn: false })
        //     }
        //   })
        //   .catch(err => {
        //     console.log('err', err)
        //   })
        loginState.setState({ loggedIn: false })
      }

      const handleLogin = resultX => {
        resultX.e.preventDefault()
        resultX.form.validateFields(async (err, values) => {
          if (!err) {
            // fetch('http://localhost:8080/auth/login', {
            //   method: 'post',
            //   body: JSON.stringify(values),
            //   credentials: 'include'
            // })
            //   .then(({ status }) => {
            //     if (status === 200) loginState.setState({ loggedIn: true })
            //   })
            //   .catch(err => {
            //     console.log('err', err)
            //   })

            console.log('===test===')
            resultX.loginAction.mutation({ variables: values })
            loginState.setState({ loggedIn: true })
          }
        })
      }

      const handleLoginEvent = { handleLogout, handleLogin }

      loginblock = { loginState, handleLoginEvent }

      return (
        <GlobalBlock.Provider value={loginblock}>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={toggleMenuModal.on}
              style={{ minHeight: '100vh' }}
              breakpoint="lg"
              collapsedWidth="0"
            >
              <div className="logo" />
              <Nav />
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Row type="flex" justify="space-between">
                  <Col span={1}>
                    {' '}
                    <Icon
                      className="trigger"
                      type={toggleMenuModal.on ? 'menu-unfold' : 'menu-fold'}
                      onClick={toggleMenuModal.toggle}
                    />
                  </Col>
                  <Col span={20}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '20px'
                      }}
                    >
                      <span style={{ marginRight: '20px;' }}>Main</span>
                      <Icon type="bell" style={{ marginRight: '20px' }} />
                      <Avatar
                        style={{ backgroundColor: '#87d068' }}
                        icon="user"
                      />
                    </div>
                  </Col>
                </Row>
              </Header>
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: 300
                }}
              >
                {props.children}
              </Content>
            </Layout>
          </Layout>
        </GlobalBlock.Provider>
      )
    }}
  </AdoptContainer>
)
