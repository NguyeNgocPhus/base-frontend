import React, { useState, useEffect } from "react";
import { REQUEST_STATE } from "../../../app-config/constants";
import { useNhaCungCap } from "../../../store/dmp/use-nha-cung-cap";
import { Cols } from "../../../ui-source/colunm";
import { MyOption, MySelect } from "../../../ui-source/select";
import { BoldText, NormalText } from "../../../ui-source/text";
import "./select-option.css";
export const ChonNhaCungCap = ({
  setSelectedNhaCungCap,
  nhaCungCapError,
  isAdmin,
  setSelectedNhaCungCapName,
}) => {
  const [option, requestOptionData] = useNhaCungCap();
  const [value, setValue] = useState("all");

  useEffect(() => {
    // load data;
    requestOptionData({
      Page: 1,
      Size: 10000,
    });

    setSelectedNhaCungCap("all");
    setSelectedNhaCungCapName("");
  }, []);

  useEffect(() => {
    if (!isAdmin && option.state === REQUEST_STATE.SUCCESS) {
      const selectedItem = option.data.result ? option.data.result[0] : {};
      setSelectedNhaCungCap(selectedItem.supplier);
      setSelectedNhaCungCapName(selectedItem.name);
    }
  }, [isAdmin, option]);

  const onChange = (value, info) => {
    // select option;
    setValue(value);
    setSelectedNhaCungCap(value);
    setSelectedNhaCungCapName(info?.name);
  };

  if (!isAdmin) return "";

  return (
    <div className="select-option">
      <Cols className={"row-space-around"} style={{ marginBottom: "10px" }}>
        <BoldText>Nhà cung cấp</BoldText>
      </Cols>
      {option.state === REQUEST_STATE.SUCCESS ? (
        <Cols>
          <MySelect
            value={value}
            showArrow
            allowClear
            onChange={onChange}
            showSearch
            filterOption={(input, option) => {
              if (option.title) {
                return (
                  option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }
            }}
            placeholder="Chọn nhà cung cấp"
            className={"btn-dropdown"}
          >
            {
              <MyOption key="all" value="all">
                Chọn nhà cung cấp
              </MyOption>
            }
            {option.data.result.map((item, index) => (
              <MyOption
                value={item.supplier}
                key={index}
                title={`${item.supplier} ${item.name}`}
                name={item.name}
              >
                {item.supplier}_{item.name}
              </MyOption>
            ))}
          </MySelect>
          {nhaCungCapError ? (
            <NormalText style={{ color: "#FD5202", transition: "0.4s" }}>
              vui long nhap nha cung cap
            </NormalText>
          ) : null}
        </Cols>
      ) : null}
    </div>
  );
};
