import { Input, Layout, Space } from "antd";
import React, { useEffect, useState } from "react";
import { ImageUI } from "../../ui-source/image";
import { HeadText, NormalText, TitleText } from "../../ui-source/text";
import { FormItem, FormUI } from "../../ui-source/form";
import presentation from "../../ui-source/assets/images/presentation.png";
import logo from "../../ui-source/assets/images/logo.png";
import "./style.css";
import { Rows } from "../../ui-source/row";
import { InputText } from "../../ui-source/input";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { ButtonH44Orange } from "../../ui-source/button";
import { useUserLogin } from "../../store/auth/use-user-login";
import { REQUEST_STATE } from "../../app-config/constants";
import { useHistory } from "react-router-dom";
import { NotificationError } from "../../ui-source/notification";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../store/auth/share-state";
import { getUserInfo } from "../../app-helper";
function UserLogin() {
  const [userLoginData, requestLogin, setUserLoginData] = useUserLogin();
  const userInfo = getUserInfo();

  const [userName, setUserName] = useState("");
  const [password, setPasswrod] = useState("");
  const history = useHistory();
  if (userInfo) {
    history.push("/home");
  }
  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPasswrod(e.target.value);
  };

  const doLogin = () => {
    requestLogin({ userName, password });
  };

  const onFinish = () => {
    doLogin();
  };
  useEffect(() => {
    if (userLoginData.state === REQUEST_STATE.SUCCESS) {
      history.push("/home");
    } else if (userLoginData.state === REQUEST_STATE.ERROR) {
      const errorMsg = userLoginData?.message ? userLoginData?.message : "";

      NotificationError(userLoginData.state, errorMsg);
    }
  }, [userLoginData, history]);

  return (
    <Layout className="login-layout">
      <div className="left">
        <div className="content">
          <NormalText>BAO CAO NANG LUC</NormalText>
          <HeadText style={{ marginTop: "6px" }}>Công ty cung ứng</HeadText>
        </div>
        <ImageUI src={presentation} preview={false}></ImageUI>
        <br />
        <br />
      </div>
      <Layout.Content>
        <div
          style={{
            width: "300px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "0 380px",
          }}
        >
          <Rows className="logo">
            <ImageUI src={logo}></ImageUI>
          </Rows>

          <FormUI
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            className="login-form"
          >
            <TitleText className="email-text">Email</TitleText>
            <FormItem>
              <InputText
                className="email-input"
                onChange={onUserNameChange}
                suffix={<UserOutlined style={{ color: "#8B8989" }} />}
              ></InputText>
            </FormItem>
            <TitleText className="password-text">Password</TitleText>
            <FormItem>
              <Input.Password
                onChange={onPasswordChange}
                className="password-input"
              ></Input.Password>
            </FormItem>
            <FormItem className="button-form-field">
              <ButtonH44Orange htmlType="submit" className="btn-dismiss">
                Submit
              </ButtonH44Orange>
            </FormItem>
          </FormUI>
          <Rows className="copy-right">
            <NormalText className="copy-right-text">
              © Golden Gate Group. Allright Reserved
            </NormalText>
          </Rows>
          <Rows className="bottom-bar">
            <div className="group-info">
              <div className="item-info">
                <Space horizontalSize={10} style={{ marginTop: 5 }}>
                  <PhoneOutlined rotate={90} />
                  <NormalText
                    className="support-title"
                    style={{ fontWeight: "bold" }}
                  >
                    IT hỗ trợ
                  </NormalText>
                </Space>
              </div>
              <div className="item-info has-border">
                <NormalText className="dot">Miền Bắc</NormalText>
                <br />
                <NormalText className="highlight">0965625130</NormalText>
              </div>
              <div className="item-info">
                <NormalText className="dot">Miền Nam</NormalText>
                <br />
                <NormalText className="highlight">0965625130</NormalText>
              </div>
            </div>
          </Rows>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default UserLogin;
