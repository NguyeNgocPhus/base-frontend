/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { REQUEST_STATE } from "../../../app-config/constants";
import { myProfileState } from "../../../store/auth/share-state";
import { useMatHang } from "../../../store/dmp/use-mat-hang";
import { Cols } from "../../../ui-source/colunm";
import { MyOption, MySelect } from "../../../ui-source/select";
import { BoldText, NormalText } from "../../../ui-source/text";

import "./select-option.css";

export const ChonMatHang = ({
  setListSelectedMatHang,
  selectedNhaCungCap,
  isAdmin,
  matHangError,
}) => {
  const myProfile = useRecoilValue(myProfileState);
  const [option, requestOptionData] = useMatHang();
  const [value, setValue] = useState([]);
  console.log(selectedNhaCungCap);
  useEffect(() => {
    // load data;
    if (isAdmin && selectedNhaCungCap === "all") {
      requestOptionData({
        Page: 1,
        Size: 10000,
      });
    } else {
      requestOptionData({
        MaNcc: selectedNhaCungCap || myProfile?.data?.MaNcc || "",
        Page: 1,
        Size: 10000,
      });
    }

    setValue(["all"]);
    setListSelectedMatHang([{ value: "all" }]);
  }, [isAdmin, selectedNhaCungCap]);

  const onChange = (value, item) => {
    // select option;
    if (item.length > 1) {
      if (item[item.length - 1].value === "all") {
        setValue(["all"]);
        setListSelectedMatHang({ value: "all" });
        return;
      }
      for (let i = 0; i < item.length; i++) {
        if (item[i].value === "all") {
          value.splice(i, 1);
          item.splice(i, 1);
        }
      }
      setValue(value);
      setListSelectedMatHang(item);
    } else {
      setValue(value);
      setListSelectedMatHang(item);
    }
  };

  return (
    <div className="select-option">
      <Cols className={"row-space-around"} style={{ marginBottom: "10px" }}>
        <BoldText>Mặt hàng</BoldText>
      </Cols>
      {option.state === REQUEST_STATE.SUCCESS ? (
        <Cols>
          <MySelect
            value={value}
            showArrow
            allowClear
            onChange={onChange}
            mode="multiple"
            showSearch
            filterOption={(input, option) => {
              if (option.title) {
                return (
                  option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }
            }}
            placeholder="Chọn mặt hàng"
            className={"btn-dropdown"}
          >
            {
              <MyOption key="all" value="all" title="Tất cả">
                Tất cả
              </MyOption>
            }
            {option.data.map((item, index) => (
              <MyOption
                value={item.sapCode}
                key={index}
                title={`${item.sapCode} ${item.matHang}`}
              >
                {item.sapCode}_{item.matHang}
              </MyOption>
            ))}
          </MySelect>
          {matHangError ? (
            <NormalText style={{ color: "#FD5202", transition: "0.4s" }}>
              vui long chon mat hang
            </NormalText>
          ) : null}
        </Cols>
      ) : null}
    </div>
  );
};
