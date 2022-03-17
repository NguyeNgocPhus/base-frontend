import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../app-config/constants";
import useThuongHieu from "../../../store/dmp/use-thuong-hieu";
import { Cols } from "../../../ui-source/colunm";
import { MyOption, MySelect } from "../../../ui-source/select";
import { BoldText, NormalText } from "../../../ui-source/text";

const ChonThuongHieu = ({ setSelectedThuongHieu, thuongHieuError }) => {
  const [dataThuongHieu, requestDataThuongHieu] = useThuongHieu();
  const [listFilteredThuongHieu, setListFilteredThuongHieu] = useState([]);
  const [value, setValue] = useState(["all"]);

  useEffect(() => {
    requestDataThuongHieu();

    setSelectedThuongHieu([{ value: "all" }]);
  }, []);

  useEffect(() => {
    setListFilteredThuongHieu(dataThuongHieu.data.result);
  }, [dataThuongHieu]);

  const onChange = (value, item) => {
    console.log(item);
    if (item.length > 0) {
      if (item[item.length - 1].value === "all") {
        setValue(["all"]);
        setSelectedThuongHieu([{ value: "all" }]);
      } else {
        for (let i = 0; i < item.length; i++) {
          if (item[i].value === "all") {
            item.splice(i, i + 1);
            value.splice(i, i + 1);
          }
        }
        setSelectedThuongHieu(item);
        setValue(value);
      }
    } else {
      setValue([]);
      setSelectedThuongHieu([]);
    }
  };
  return (
    <div className="select-option">
      <Cols>
        <BoldText>Thương hiệu</BoldText>
      </Cols>
      {dataThuongHieu && dataThuongHieu.state === REQUEST_STATE.SUCCESS && (
        <Cols>
          <MySelect
            value={value}
            placeholder="Chọn thương hiệu"
            allowClear
            showSearch
            showArrow
            filterOption={(input, option) => {
              if (option.title) {
                return (
                  option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }
            }}
            mode="multiple"
            onChange={onChange}
          >
            <MyOption key="all" value="all" title="Tất cả">
              Tất cả
            </MyOption>
            {listFilteredThuongHieu &&
              listFilteredThuongHieu.map((thuongHieu, index) => {
                return (
                  <MyOption
                    key={index}
                    value={thuongHieu.maChuoi}
                    title={thuongHieu.thuongHieu}
                  >
                    {thuongHieu.thuongHieu}
                  </MyOption>
                );
              })}
          </MySelect>
          {thuongHieuError && (
            <NormalText style={{ color: "#FD5202" }}>
              vui lòng nhập Khu vực
            </NormalText>
          )}
        </Cols>
      )}
    </div>
  );
};
export default ChonThuongHieu;
