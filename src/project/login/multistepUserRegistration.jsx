import React, { useState, useEffect } from 'react';
import { Button, message, Steps, theme, Layout, Select, Checkbox, Image, Upload, Form, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
// import 'antd/dist/antd.min.css';
const steps = [
  {
    title: 'Basic Info',
    content: '1',
  },
  {
    title: 'Details',
    content: '2',
  },
  {
    title: 'Account',
    content: '3',
  },
  {
    title: 'Confirmation',
    content: '4',
  },
];








const UserRegistration = () => {
  const { token } = theme.useToken();
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const [msg, contextHolder] = message.useMessage();
  const [basicInfo, setBasicInfo] = useState({});
  const [details, setDetails] = useState({});
  const [account, setAccount] = useState({});
  const onBasicInfoFinish = values => {
    setBasicInfo(values)
    console.log('BasicInfo:', values);
    // value.format('YYYY-MM-DD')
    console.log('BasicInfo:', values.DateofBirth?.format('YYYY-MM-DD'));
    setCurrent(current + 1);
  };

  const onDetailsFinish = values => {
    setDetails(values)
    setCurrent(current + 1);
    console.log('Detail:', values);
  };

  const normFile = e => {
    console.log('e:', e);
    // if(e!=null)
    // {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
    // }
    // else if(details!=null&&details.AvatarPicture!=null&&details.AvatarPicture.length>0)
    // {
    //   return details.AvatarPicture[0];
    // }


  };
  const onDetailsFinishFailed = errorInfo => {
    console.log('DetailsFailed:', errorInfo);
  };

  const onAccountFinish = values => {
    setAccount(values)
    setCurrent(current + 1);
    console.log('Account:', values);
  };
  const onAccountFailed = errorInfo => {
    console.log('AccountFailed:', errorInfo);
  };



  const onBasicInfoFinishFailed = errorInfo => {
    console.log('BasicInfoFailed:', errorInfo);
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    console.log('basicInfo1:', basicInfo);
    console.log('details1:', details);
    console.log('account1:', account);
    setCurrent(current - 1);
  };
  const done = () => {
    console.log('basicInfo:', basicInfo);
    console.log('details:', details);
    console.log('account:', account);
    console.log('call the API:');
    msg.success('Processing complete!')
  };

  const items = steps.map(item => ({ key: item.title, title: item.title }));
  const contentStyle = {
    lineHeight: '260px',
    // textAlign: 'center',
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    backgroundColor: 'white',
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: "forestgreen" }}>
          <div className="demo-logo" />
          <span style={{ color: '#fff', fontSize: 23 }}> Multi-step User Registration</span>
        </Header>
        <Content style={{ padding: '0 48px',background:'white' }}>

          <div
            style={{
              // background: token.colorFillAlter,
              background:'white',
              minHeight: 580,
              padding: 24,
              borderRadius: token.borderRadiusLG,
            }}
          >
            <Steps current={current} items={items} />
            <div style={contentStyle}>

              {(steps[current].content == '1') && (
                <Form
                  name="basic"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                  style={{ maxWidth: '100%', marginTop: 30 }}
                  initialValues={{ ...basicInfo }}
                  onFinish={onBasicInfoFinish}
                  onFinishFailed={onBasicInfoFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="First Name"
                    name="FirstName"
                    rules={[{ required: true, message: 'Please input your First Name!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="LastName"
                    rules={[{ required: true, message: 'Please input your Last Name !' }]}
                  >
                    <Input />
                    {/* <Input.Password /> */}
                  </Form.Item>

                  <Form.Item label="Date of Birth"
                    name="DateofBirth"
                    rules={[{ required: true, message: 'Please input your Date of Birth !' }]}>
                    <DatePicker />
                  </Form.Item>

                  {/* <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item> */}

                  <Form.Item label={null}>

                    <Button type="primary" htmlType="submit">
                      Next
                    </Button>

                  </Form.Item>
                </Form>
              )}
              {(steps[current].content == '2') && (
                <Form
                  name="details"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                  style={{ maxWidth: '100%', marginTop: 30 }}
                  initialValues={{ ...details }}
                  onFinish={onDetailsFinish}
                  onFinishFailed={onDetailsFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item label="Country"
                    name="Country"
                    rules={[{ required: true, message: 'Please select your Country !' }]}>
                    <Select>
                      <Select.Option value="China">China</Select.Option>
                      <Select.Option value="USA">USA</Select.Option>
                      <Select.Option value="England">England</Select.Option>
                      <Select.Option value="Russian">Russian</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Gender"
                    name="Gender"
                    rules={[{ required: true, message: 'Please select your Gender !' }]}>
                    <Select>
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Avatar picture" name="AvatarPicture" valuePropName="AvatarPicture" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                      <button
                        style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                        type="button"
                      >
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    </Upload>
                  </Form.Item>


                  <Form.Item label={null}>
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                      Previous
                    </Button>

                    <Button type="primary" htmlType="submit">
                      Next
                    </Button>
                  </Form.Item>
                </Form>
              )}
              {(steps[current].content == '3') && (
                <Form
                  name="account"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                  style={{ maxWidth: '100%', marginTop: 30 }}
                  initialValues={{ ...account }}
                  onFinish={onAccountFinish}
                  onFinishFailed={onAccountFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="Email"

                    rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="Password"

                    rules={[{ required: true, message: 'Please input your Password !' }, { min: 8 }]}
                  >
                    {/* <Input /> */}
                    <Input.Password />
                  </Form.Item>
                  <Form.Item label={null}>
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                      Previous
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Next
                    </Button>
                  </Form.Item>
                </Form>
              )}
              {(steps[current].content == '4') && (
                //  const [basicInfo, setBasicInfo] = useState({});
                //  const [details, setDetails] = useState({});
                //  const [account, setAccount] = useState({});

                <div style={{ lineHeight: 3, paddingLeft: 50 }}>
                  {/* <span>First Name :</span> <span>{basicInfo?.FirstName}</span> */}
                  <span>Please confirm the information you entered </span>
                  <table>
                    <tbody>
                      <tr>
                        <td><span>First Name :</span></td><td><span>{basicInfo?.FirstName}</span></td>
                      </tr>
                      <tr>
                        <td><span>Last Name  :</span></td><td><span>{basicInfo?.LastName}</span></td>
                      </tr>
                      <tr>
                        <td><span>Date of Birth :</span></td><td><span>{basicInfo?.DateofBirth?.format('YYYY-MM-DD')}</span></td>
                      </tr>
                      <tr>
                        <td><span>Country  :</span></td><td><span>{details?.Country}</span></td>
                      </tr>
                      <tr>
                        <td><span>Gender  :</span></td><td><span>{details?.Gender}</span></td>
                      </tr>
                      <tr>
                        <td><span>Avatar picture  :</span></td><td>
                          {(details?.AvatarPicture.length > 0) && (<Image width={200} src={details?.AvatarPicture[0]?.thumbUrl}></Image>)}
                          <span>
                            {/* {details?.AvatarPicture} */}
                          </span></td>
                      </tr>
                      <tr>
                        <td><span>Email  :</span></td><td><span>{account?.Email}</span></td>
                      </tr>
                      {/* <tr>
                        <td><span>Password  :</span></td><td><span>{account?.Password}</span></td>
                      </tr> */}

                      <tr>
                        <td>
                          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                          </Button>
                        </td>
                        <td>
                        {contextHolder}
                          {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => done()}  >
                              Done
                            </Button>
                          )}

                        </td>

                      </tr>

                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* <div style={{ marginTop: 24 }}>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => done()}  >
                  Done
                </Button>
              )}
              {contextHolder}
              {current > 0 && (

                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
            </div> */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center',backgroundColor:'white' }}>
          User Registration ©{new Date().getFullYear()} Created by Xigui Zhang
        </Footer>
      </Layout>

    </>
  );
};
export default UserRegistration;