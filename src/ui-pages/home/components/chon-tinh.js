import React, { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../app-config/constants";
import useTinh from "../../../store/dmp/use-tinh";
import { Cols } from "../../../ui-source/colunm";
import { MyOption, MySelect } from "../../../ui-source/select";
import { BoldText, NormalText } from "../../../ui-source/text";

function ChonTinh({ selectedKhuVuc, tinhError, setSelectedTinh }) {
  const [dataTinh, requestDataTinh] = useTinh();
  const [listFilteredTinh, setListFileterTinh] = useState([]);
  const [value, setValue] = useState(["all"]);
  const [showAllOption, setShowAllOption] = useState(false);
  useEffect(() => {
    requestDataTinh();
  }, []);
  useEffect(() => {
    if (dataTinh.state === REQUEST_STATE.SUCCESS) {
      setListFileterTinh(dataTinh.data.result);
    }
  }, [dataTinh]);

  useEffect(() => {
    setValue([]);
    setSelectedTinh([]);
    if (selectedKhuVuc && selectedKhuVuc.length > 0) {
      if (selectedKhuVuc[0].value === "all") {
        setValue(["all"]);
        setSelectedTinh([{ value: "all" }]);
        setShowAllOption(true);
      } else {
        let tinh = [];
        dataTinh.data.result.forEach((val) => {
          selectedKhuVuc.forEach((kv) => {
            if (kv.value === val.sbuCode) {
              tinh.push(val);
            }
          });
        });
        setShowAllOption(false);
        //console.log(tinh);
        setListFileterTinh(tinh);
      }
    } else {
      setListFileterTinh([]);
    }
  }, [selectedKhuVuc]);
  const onChange = (value, item) => {
    // console.log(item);
    if (item.length > 0) {
      if (item[item.length - 1].value === "all") {
        setValue(["all"]);
        setSelectedTinh([{ value: "all" }]);
      } else {
        for (let i = 0; i < item.length; i++) {
          if (item[i].value === "all") {
            item.splice(i, i + 1);
            value.splice(i, i + 1);
          }
        }
        setValue(value);
        setSelectedTinh(item);
      }
    } else {
      setValue([]);
      setSelectedTinh([]);
    }
  };

  return (
    <div className="select-option">
      <Cols>
        <BoldText>Tỉnh: </BoldText>
      </Cols>
      {dataTinh && dataTinh.state === REQUEST_STATE.SUCCESS ? (
        <Cols>
          <MySelect
            value={value}
            allowClear
            showSearch
            showArrow
            placeholder="Chọn tỉnh"
            mode="multiple"
            onChange={onChange}
          >
            {showAllOption && (
              <MyOption key="all" value="all" title="tất cả">
                Tất cả
              </MyOption>
            )}

            {dataTinh &&
              dataTinh.state === REQUEST_STATE.SUCCESS &&
              listFilteredTinh.map((data, index) => {
                return (
                  <MyOption key={index} value={data.cityCode} title={data.tinh}>
                    {data.tinh}
                  </MyOption>
                );
              })}
          </MySelect>
          {tinhError && (
            <NormalText style={{ color: "#FD5202" }}>
              vui lòng nhập tỉnh
            </NormalText>
          )}
        </Cols>
      ) : null}
    </div>
  );
}

export default ChonTinh;
