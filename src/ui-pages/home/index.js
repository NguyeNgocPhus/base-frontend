import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ROLES } from "../../app-config/constants";
import { myProfileState } from "../../store/auth/share-state";
import { ButtonH44Orange } from "../../ui-source/button";
import { BoldText, NormalText } from "../../ui-source/text";
import ChonKhuVuc from "./components/chon-khu-vuc";
import { ChonMatHang } from "./components/chon-mat-hang";
import ChonMien from "./components/chon-mien";
import { ChonNhaCungCap } from "./components/chon-nha-cung-cap";
import ChonNhaHang from "./components/chon-nha-hang";
import ChonThuongHieu from "./components/chon-thuong-hieu";
import ChonTinh from "./components/chon-tinh";
import "./style.css";
function Home() {
  const dataMyProfile = useRecoilValue(myProfileState);
  //select Mien
  const [selectedMien, setSelectedMien] = useState("");
  //select Khu vuc
  const [selectedKhuVuc, setSelectedKhuVuc] = useState([]);
  //select Tinh
  const [selectedTinh, setSelectedTinh] = useState([]);
  //select Thuong hieu
  const [selectedThuongHieu, setSelectedThuongHieu] = useState([]);
  //select Nha Hang
  const [selectedNhaHang, setSelectedNhaHang] = useState([]);
  //select nha cung cap
  const [selectedNhaCungCap, setSelectedNhaCungCap] = useState("");
  const [selectedNhaCungCapName, setSelectedNhaCungCapName] = useState("");
  //select mat hang
  const [seletedMatHang, setListSelectedMatHang] = useState([]);
  //validator input
  const [validationError, setValidationError] = useState({
    mienError: false,
    khuVucError: false,
    tinhError: false,
    thuongHieuError: false,
    nhaHangError: false,
    nhaCungCapError: true,
    matHangError: false,
  });
  let isAdmin = false;
  if (dataMyProfile.data) {
    const { roles } = dataMyProfile.data;
    (roles || []).forEach((item) => {
      if (item.name != null && item.name.toLowerCase() === ROLES.SYSTEM_ADMIN) {
        isAdmin = true;
      }
    });
  }
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
  //validation mat hang
  useEffect(() => {
    if (seletedMatHang && seletedMatHang.length > 0) {
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
  }, [seletedMatHang]);
  // validation Khu vuc
  useEffect(() => {
    if (selectedKhuVuc && selectedKhuVuc.length > 0) {
      setValidationError({
        ...validationError,
        khuVucError: false,
      });
    } else {
      setValidationError({
        ...validationError,
        khuVucError: true,
      });
    }
  }, [selectedKhuVuc]);

  useEffect(() => {
    if (selectedTinh && selectedTinh.length > 0) {
      setValidationError({
        ...validationError,
        tinhError: false,
      });
    } else {
      setValidationError({
        ...validationError,
        tinhError: true,
      });
    }
  }, [selectedTinh]);
  useEffect(() => {
    if (selectedThuongHieu && selectedThuongHieu.length > 0) {
      setValidationError({
        ...validationError,
        thuongHieuError: false,
      });
    } else {
      setValidationError({
        ...validationError,
        thuongHieuError: true,
      });
    }
  }, [selectedThuongHieu]);
  useEffect(() => {
    if (selectedThuongHieu && selectedThuongHieu.length > 0) {
      setValidationError({
        ...validationError,
        thuongHieuError: false,
      });
    } else {
      setValidationError({
        ...validationError,
        thuongHieuError: true,
      });
    }
  }, [selectedNhaCungCap]);

  useEffect(() => {
    let ncc = isAdmin ? selectedNhaCungCap : dataMyProfile?.data?.supplier;
    if (!ncc || ncc === "all") {
      setValidationError({
        ...validationError,
        nhaCungCapError: true,
      });
    } else {
      setValidationError({
        ...validationError,
        nhaCungCapError: false,
      });
    }
  }, [selectedNhaCungCap, dataMyProfile, isAdmin]);
  const onClick = () => {
    console.log("mien", selectedMien);
    console.log("khu vuc", selectedKhuVuc);
    console.log("tinh", selectedTinh);
    console.log("thuong hieu", selectedThuongHieu);
    console.log("nha hang", selectedNhaHang);
    console.log("nhacc", selectedNhaCungCap, selectedNhaCungCapName);
    console.log("mat hang", seletedMatHang);
  };
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
            khuVucError={validationError.khuVucError}
          ></ChonKhuVuc>
          <ChonTinh
            selectedKhuVuc={selectedKhuVuc}
            tinhError={validationError.tinhError}
            setSelectedTinh={setSelectedTinh}
          ></ChonTinh>
          <ChonThuongHieu
            setSelectedThuongHieu={setSelectedThuongHieu}
            thuongHieuError={validationError.thuongHieuError}
          ></ChonThuongHieu>
          <ChonNhaHang
            selectedThuongHieu={selectedThuongHieu}
            selectedTinh={selectedTinh}
            nhaHangError={validationError.nhaHangError}
            setSelectedNhaHang={setSelectedNhaHang}
          ></ChonNhaHang>
          <ChonNhaCungCap
            setSelectedNhaCungCap={setSelectedNhaCungCap}
            nhaCungCapError={validationError.nhaCungCapError}
            isAdmin={isAdmin}
            setSelectedNhaCungCapName={setSelectedNhaCungCapName}
          ></ChonNhaCungCap>
          {!isAdmin || (isAdmin && !validationError.nhaCungCapError) ? (
            <ChonMatHang
              setListSelectedMatHang={setListSelectedMatHang}
              matHangError={validationError.matHangError}
              selectedNhaCungCap={selectedNhaCungCap}
              isAdmin={isAdmin}
            />
          ) : null}
          <ButtonH44Orange onClick={onClick}>onClick</ButtonH44Orange>
        </div>
      </div>
    </>
  );
}

export default Home;
