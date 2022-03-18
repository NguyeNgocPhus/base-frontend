import React, { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../app-config/constants";
import useMien from "../../../store/dmp/use-mien";
import { Cols } from "../../../ui-source/colunm";
import { MyOption, MySelect } from "../../../ui-source/select";
import { BoldText, NormalText } from "../../../ui-source/text";
import "./select-option.css";
function ChonMien({ setSelectedMien, mienError }) {
  const [dataMien, requestDataMien] = useMien();
  const [value, setValue] = useState("all");
  useEffect(() => {
    requestDataMien();
    setSelectedMien({ value: "all" });
  }, [setSelectedMien]);

  const onChange = (value, item) => {
    setValue(value);
    setSelectedMien(item);
  };
  return (
    <div className="select-option">
      <Cols className={"row-space-around"} style={{ marginBottom: "10px" }}>
        <BoldText>Miền</BoldText>
      </Cols>
      {dataMien.state === REQUEST_STATE.SUCCESS ? (
        <Cols>
          <MySelect
            value={value}
            placeholder="Chọn miền"
            allowClear
            showSearch
            filterOption={(input, option) => {
              if (option.title) {
                return (
                  option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }
            }}
            showArrow
            onChange={onChange}
          >
            <MyOption key="all" value="all" title="tất cả">
              Tất cả
            </MyOption>
            {dataMien.data.result.map((item, index) => {
              return (
                <MyOption key={index} value={item.sbu} title={item.mien}>
                  {item.mien}
                </MyOption>
              );
            })}
          </MySelect>
          {mienError && (
            <NormalText style={{ color: "#FD5202" }}>
              vui lòng nhập miền
            </NormalText>
          )}
        </Cols>
      ) : null}
    </div>
  );
}

export default ChonMien;
