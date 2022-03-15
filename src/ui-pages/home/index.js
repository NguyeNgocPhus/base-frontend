import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { myProfileState } from "../../store/auth/share-state";
import { BoldText, NormalText } from "../../ui-source/text";
import ChonKhuVuc from "./components/chon-khu-vuc";
import ChonMien from "./components/chon-mien";
import "./style.css";
function Home() {
  const dataMyProfile = useRecoilValue(myProfileState);

  //select Mien
  const [selectedMien, setSelectedMien] = useState("");
  //select Khu vuc
  const [selectedKhuVuc, setSelectedKhuVuc] = useState("");
  //validator input
  const [validationError, setValidationError] = useState({
    mienError: false,
    khuVucError: false,
  });
  ///validation Mien
  useEffect(() => {
    if (selectedMien) {
      setValidationError({
        ...validationError,
        mienError: false,
      });
    } else {
      setValidationError({
        ...validationError,
        mienError: true,
      });
    }
  }, [selectedMien]);
  // validation Khu vuc
  //console.log(dataMyProfile);
  return (
    <>
      <div className="trigger-filter">
        <div className="header-content">
          <NormalText style={{ fontSize: "12px" }}>LỰA CHỌN</NormalText>
          <br></br>
          <BoldText style={{ fontSize: "16px" }}>
            TIÊU CHÍ HIỂN THỊ BÁO CÁO
          </BoldText>
          <ChonMien
            setSelectedMien={setSelectedMien}
            mienError={validationError.mienError}
          ></ChonMien>
          <ChonKhuVuc
            setSelectedKhuVuc={setSelectedKhuVuc}
            selectedMien={selectedMien}
          ></ChonKhuVuc>
        </div>
      </div>
    </>
  );
}

export default Home;
