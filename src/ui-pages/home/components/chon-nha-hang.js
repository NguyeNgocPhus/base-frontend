import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../app-config/constants";
import useNhaHang from "../../../store/dmp/use-nha-hang";
import { Cols } from "../../../ui-source/colunm";
import { MyOption, MySelect } from "../../../ui-source/select";
import { BoldText, NormalText } from "../../../ui-source/text";
import "./select-option.css";
const ChonNhaHang = ({
  selectedThuongHieu,
  selectedTinh,
  nhaHangError,
  setSelectedNhaHang,
}) => {
  const [dataNhaHang, requestDataNhaHang] = useNhaHang();
  const [listFilteredNhaHang, setListFilteredNhaHang] = useState([]);
  const [value, setValue] = useState(["all"]);

  useEffect(() => {
    requestDataNhaHang({
      Page: 1,
      Size: 10000,
    });
    setSelectedNhaHang([{ value: "all" }]);
  }, []);

  useEffect(() => {
    if (dataNhaHang && dataNhaHang?.data?.result?.length > 0)
      setListFilteredNhaHang(dataNhaHang.data.result);
  }, [dataNhaHang]);
  useEffect(() => {
    if (dataNhaHang?.data?.result && dataNhaHang?.data?.result.length > 0) {
      let isAllTinh =
        selectedTinh &&
        selectedTinh.length > 0 &&
        selectedTinh[0].value === "all";
      let isAllThuongHieu =
        selectedThuongHieu &&
        selectedThuongHieu.length > 0 &&
        selectedThuongHieu[0].value === "all";
      //setListFilteredNhaHang(dataNhaHang?.data?.result);
      if (!isAllTinh && !isAllThuongHieu) {
        const tinh = filterTinh(dataNhaHang.data.result, selectedTinh);
        if (tinh && tinh.length > 0) {
          const thuonghieu = filterThuongHieu(tinh, selectedThuongHieu);
          setListFilteredNhaHang(thuonghieu);
        }
      } else if (!isAllTinh && isAllThuongHieu) {
        const tinh = filterTinh(dataNhaHang.data.result, selectedTinh);
        setListFilteredNhaHang(tinh);
      } else if (isAllTinh && !isAllThuongHieu) {
        const thuonghieu = filterThuongHieu(
          dataNhaHang.data.result,
          selectedThuongHieu
        );

        setListFilteredNhaHang(thuonghieu);
      } else {
        setValue(["all"]);
        setListFilteredNhaHang(dataNhaHang.data.result);
      }
    }
  }, [selectedTinh, selectedThuongHieu]);

  const filterTinh = (arr1, arr2) => {
    return arr1.filter((data) => {
      return arr2.findIndex((valArr2) => data.cityCode === valArr2.value) > -1
        ? true
        : false;
    });
  };
  const filterThuongHieu = (arr1, arr2) => {
    return arr1.filter((data) => {
      return arr2.findIndex((valArr2) => data.maChuoi === valArr2.value) > -1
        ? true
        : false;
    });
  };
  const onChange = (value, item) => {
    if (item.length > 0) {
      if (item[item.length - 1].value === "all") {
        setValue(["all"]);
        setSelectedNhaHang([{ value: "all" }]);
      } else {
        for (let i = 0; i < item.length; i++) {
          if (item[i].value === "all") {
            item.splice(i, i + 1);
            value.splice(i, i + 1);
          }
        }
        setSelectedNhaHang(item);
        setValue(value);
      }
    } else {
      setValue([]);
      setSelectedNhaHang([]);
    }
  };

  return (
    <div className="select-option">
      <Cols className={"row-space-around"} style={{ marginBottom: "10px" }}>
        <BoldText>Nhà hàng</BoldText>
      </Cols>
      {dataNhaHang && dataNhaHang.state === REQUEST_STATE.SUCCESS && (
        <MySelect
          value={value}
          placeholder="Chọn nhà hàng"
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
          <MyOption key={"all"} value={"all"} title={"Tất cả"}>
            Tất cả
          </MyOption>
          {listFilteredNhaHang.length > 0 &&
            listFilteredNhaHang.map((data, index) => {
              return (
                <MyOption
                  key={index}
                  value={data.sapCode}
                  title={`${data.sapCode} ${data.restaurantName}`}
                >
                  {`${data.sapCode}_${data.restaurantName}`}
                </MyOption>
              );
            })}
        </MySelect>
      )}
      {nhaHangError && (
        <NormalText style={{ color: "#FD5202" }}>
          vui lòng nhập nhà hàng
        </NormalText>
      )}
    </div>
  );
};
export default ChonNhaHang;
