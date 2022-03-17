import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../app-config/constants";
import { stateKhuVuc } from "../../../store/dmp/share-state";
import useKhuVuc from "../../../store/dmp/use-khu-vuc";
import { Cols } from "../../../ui-source/colunm";
import { MyOption, MySelect } from "../../../ui-source/select";
import { BoldText, NormalText } from "../../../ui-source/text";

function ChonKhuVuc({ setSelectedKhuVuc, selectedMien, khuVucError }) {
  ///console.log(khuVucError);
  const [dataKhuVuc, setDataKhuVuc] = useKhuVuc();
  const [value, setValue] = useState(["all"]);
  const [listFilterKhuvuc, setListFilerKhuVuc] = useState([]);
  const [showAllOption, setShowAllOption] = useState(false);
  //console.log(dataKhuVuc);
  useEffect(() => {
    setDataKhuVuc();
  }, []);
  useEffect(() => {
    if (dataKhuVuc.data.result) {
      setListFilerKhuVuc(dataKhuVuc.data.result);
      setShowAllOption(true);
      setValue(["all"]);
    }
  }, [dataKhuVuc]);
  useEffect(() => {
    setValue([]);
    setSelectedKhuVuc([]);
    if (selectedMien) {
      if (selectedMien.value === "all") {
        setListFilerKhuVuc(dataKhuVuc.data.result);
        setSelectedKhuVuc([{ value: "all" }]);
        setValue(["all"]);
        setShowAllOption(true);
      } else {
        setListFilerKhuVuc(
          dataKhuVuc.data.result.filter(
            (khuvuc) => khuvuc.sbu === selectedMien.value
          )
        );
        setShowAllOption(false);
      }
    } else {
      setListFilerKhuVuc([]);
    }
  }, [selectedMien]);

  const onChange = (value, item) => {
    if (item.length > 0) {
      if (item[item.length - 1].value === "all") {
        setValue(["all"]);
        setSelectedKhuVuc([{ value: "all" }]);
      } else {
        for (let i = 0; i < item.length; i++) {
          if (item[i].value === "all") {
            item.splice(i, i + 1);
            value.splice(i, i + 1);
          }
        }
        setSelectedKhuVuc(item);
        setValue(value);
        setShowAllOption(false);
      }
    } else {
      setValue(value);
      setSelectedKhuVuc(item);
    }
  };
  return (
    <div className="select-option">
      <Cols>
        <BoldText>Khu Vực</BoldText>
      </Cols>
      {dataKhuVuc && dataKhuVuc.state === REQUEST_STATE.SUCCESS ? (
        <Cols>
          <MySelect
            value={value}
            placeholder="Chọn khu vực"
            allowClear
            showSearch
            showArrow
            mode="multiple"
            onChange={onChange}
          >
            {showAllOption && (
              <MyOption key="all" value="all" title="Tất cả">
                Tất cả
              </MyOption>
            )}

            {listFilterKhuvuc &&
              listFilterKhuvuc.length > 0 &&
              listFilterKhuvuc.map((data, index) => {
                return (
                  <MyOption
                    key={index}
                    value={data.sbuCode}
                    title={data.khuVuc}
                  >
                    {data.khuVuc}
                  </MyOption>
                );
              })}
          </MySelect>
          {khuVucError && (
            <NormalText style={{ color: "#FD5202" }}>
              vui lòng nhập khu vực
            </NormalText>
          )}
        </Cols>
      ) : null}
    </div>
  );
}
export default ChonKhuVuc;
