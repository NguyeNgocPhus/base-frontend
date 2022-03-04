import "antd/dist/antd.css";
import "./App.css";

import { ButtonH44kBlueDark, ButtonH56Orange } from "./ui-source/button";
import "./App.css";
import { InputNumberUI, InputText, TextAreaUI } from "./ui-source/input";

import {
  BoldText,
  HeadText,
  LinkText,
  NormalText,
  TitleText,
} from "./ui-source/text";
import { TableUI } from "./ui-source/table";
import { Columns } from "./ui-source/colunm";
import { FormUI } from "./ui-source/form";
import FormItem from "antd/lib/form/FormItem";
import { Form, Input, Button, Checkbox, Dropdown } from "antd";
import { MenuItem, MenuUI } from "./ui-source/menu";
import { PaginationUI } from "./ui-source/pagination";
const tableData = [
  {
    title: "An toàn thực phẩm",
    critical: "hello",
    minor: "mina",
  },
  {
    title: "Vệ sinh",
    critical: "",
    minor: "",
  },
  {
    title: "Quy cách",
    critical: "",
    minor: "",
  },
  {
    title: "Phương tiện vận chuyển",
    critical: "",
    minor: "",
  },
];
const menu = (
  <MenuUI>
    <MenuItem>
      <NormalText>helloooooooo</NormalText>
    </MenuItem>
    <MenuItem>
      <NormalText>mina</NormalText>
    </MenuItem>
    <MenuItem>
      <NormalText>nguyen phu</NormalText>
    </MenuItem>
  </MenuUI>
);
function App() {
  return (
    <div className="App">
      <ButtonH56Orange htmlType="submit" className="btn-dismiss">
        helllllllllllo s
      </ButtonH56Orange>
      <ButtonH44kBlueDark className="btn-dismiss">hello</ButtonH44kBlueDark>
      <InputText></InputText>
      <InputNumberUI></InputNumberUI>
      <TextAreaUI></TextAreaUI>
      <NormalText>dsssssssssssssssssssss</NormalText>
      <BoldText>hellllllllllllllllo</BoldText>
      <LinkText href={"#"}>dcm</LinkText>
      <TitleText className="title" level={9}>
        dcmmmmmmmmmmmmmmmmmmmm
      </TitleText>
      <HeadText className="header" level={1}>
        header
      </HeadText>
      <TableUI
        dataSource={tableData}
        bordered={true}
        pagination={false}
        className="table-ui"
        rowKey={(record) => record.title}
      >
        <Columns title="abc" dataIndex="title" width="100px"></Columns>
        <Columns title="cdbd" dataIndex="critical" width="300px"></Columns>
        <Columns title="lol" dataIndex="minor" width="300px"></Columns>
      </TableUI>
      <FormUI
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <FormItem
          label="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <InputText></InputText>
        </FormItem>
        <FormItem
          label="password"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
          className="form-ui"
        >
          <Input.Password />
        </FormItem>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </FormUI>
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <ButtonH44kBlueDark>dropdown</ButtonH44kBlueDark>
      </Dropdown>
      <PaginationUI
        defaultCurrent={1}
        total={50}
        onChange={(e) => {
          console.log(e);
        }}
      ></PaginationUI>
    </div>
  );
}

export default App;
