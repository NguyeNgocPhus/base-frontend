import { Form } from "antd";

export const FormUI = ({ className, children, ...props }) => {
  return (
    <Form className={className} {...props}>
      {children}
    </Form>
  );
};
export const FormItem = ({ className, children, ...props }) => {
  return (
    <Form.Item className={className} {...props}>
      {children}
    </Form.Item>
  );
};
