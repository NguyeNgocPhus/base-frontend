import { Dropdown, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../app-config/constants";
import useMyProfile from "../../store/auth/use-my-profile";
import LeftLayOut from "./left-menu";
import { UserOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import { NormalText } from "../../ui-source/text";
import { ImageUI } from "../../ui-source/image";
import iconLogout from "../../ui-source/assets/images/icon-logout.png";
import "./styles.css";
import { saveUserInfoStore } from "../../app-helper";
import { userInfoState } from "../../store/auth/share-state";
import { useRecoilState } from "recoil";

export const AdminLayout = (props) => {
  const [dataMyProfile, setDataMyProfile] = useMyProfile();
  const [userInfoData, setuserInfoData] = useRecoilState(userInfoState);
  const [isLoading, setLoading] = useState(true);
  // console.log(dataMyProfile);
  useEffect(() => {
    setDataMyProfile();
  }, []);
  useEffect(() => {
    if (dataMyProfile.status == REQUEST_STATE.SUCSSES) {
      // boostrap data ok;
      setTimeout(() => {
        setLoading(false);
      }, 333);
    }
  }, [dataMyProfile]);

  const onLogoutHandler = () => {
    saveUserInfoStore({});
    setuserInfoData({ token: "" });
    setTimeout(() => {
      window.location.href = window.location.origin;
    }, 100);
  };

  const menu = (
    <Menu className="top-right-menu">
      <Menu.Item key="user-info">
        <UserOutlined style={{ fontSize: "14px", marginRight: "10px" }} />
        {dataMyProfile.data?.userName}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="user-change-password">
        <EditOutlined style={{ fontSize: "14px", marginRight: "10px" }} />
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="ho-tro-nghiep-vu">
        <MailOutlined style={{ fontSize: "14px", marginRight: "10px" }} />
        Hỗ trợ nghiệp vụ
        <ul>
          <li className="item-info">
            <NormalText>Miền Bắc</NormalText>
            <br />
            <NormalText className="highlight">
              <a href={`mailto:phuteobs0166@gmail.com`}>
                phuteobs0166@gmail.com
              </a>
            </NormalText>
          </li>
          <li className="item-info">
            <NormalText>Miền Nam</NormalText>
            <br />
            <NormalText className="highlight">
              <a href={`mailto:phuteobs0166@gmail.com`}>
                phuteobs0166@gmail.com
              </a>
            </NormalText>
          </li>
        </ul>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        className="logout-label"
        onClick={onLogoutHandler}
      >
        <ImageUI
          src={iconLogout}
          preview={false}
          className="logout-icon"
          style={{ fontSize: "14px", marginRight: "10px" }}
        />{" "}
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout className="scp-admin-layout">
      <LeftLayOut></LeftLayOut>
      {!isLoading ? (
        <main className="scp-main-content" id="scp-main-content">
          {props.children}
        </main>
      ) : (
        <></>
      )}
      <div className="user-menu">
        <Dropdown overlay={menu} trigger={["click"]}>
          <UserOutlined></UserOutlined>
        </Dropdown>
      </div>
    </Layout>
  );
};
