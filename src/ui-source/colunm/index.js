
import { Table,Col } from "antd";
const { Column, ColumnGroup } = Table;
export const Cols = ({span, className, children, ...props}) => {
    return (
        <Col span={span} className={className} {...props}>
            {children}
        </Col>
    );
};
export const Columns = ({title, dataIndex, key, render, ...props}) => {
    return (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={key}
            render={render}
            {...props}
        >
        </Column>
    );
};
