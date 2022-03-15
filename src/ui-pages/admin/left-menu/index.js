import { Layout } from "antd";
import { ImageUI } from "../../../ui-source/image";
import "./style.css";
import logo from "../../../ui-source/assets/images/logo.png";
const { Sider } = Layout;

const LeftLayOut = () => {
  return (
    <Sider className="scp-left-menu" width={80}>
      <div className="logo">
        <ImageUI src={logo} preview={false}></ImageUI>
      </div>
    </Sider>
  );
};
export default LeftLayOut;
