import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../app-config/constants";
import { stateKhuVuc } from "../../../store/dmp/share-state";
import useKhuVuc from "../../../store/dmp/use-khu-vuc";
import { Cols } from "../../../ui-source/colunm";
import { MyOption, MySelect } from "../../../ui-source/select";
import { BoldText } from "../../../ui-source/text";

function ChonKhuVuc({ setSelectedKhuVuc, selectedMien }) {
  const [dataKhuVuc, setDataKhuVuc] = useKhuVuc();
  const [value, setValue] = useState(["all"]);
  const [listFilterKhuvuc, setListFilerKhuVuc] = useState([]);
  //console.log(dataKhuVuc);
  useEffect(() => {
    setDataKhuVuc();
  }, []);
  useEffect(() => {
    if (dataKhuVuc.data.result) {
      setListFilerKhuVuc(dataKhuVuc.data.result);
    }
  }, [dataKhuVuc]);
  useEffect(() => {
    //.log(selectedMien, dataKhuVuc.data);
    if (selectedMien) {
      if (selectedMien.value === "all") {
        setListFilerKhuVuc(dataKhuVuc.data.result);
        setValue("all");
      } else {
        setListFilerKhuVuc(
          dataKhuVuc.data.result.filter(
            (khuvuc) => khuvuc.sbu === selectedMien.value
          )
        );
        setValue("all");
      }
    }
  }, [selectedMien]);

  const onChange = (value) => {
    console.log(value);
    setValue(value);
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
            <MyOption key="all" value="all" title="Tất cả">
              Tất cả
            </MyOption>
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
        </Cols>
      ) : null}
    </div>
  );
}
export default ChonKhuVuc;
