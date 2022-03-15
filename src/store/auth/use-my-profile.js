import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Auth } from "../../service/auth";
import { myProfileState } from "./share-state";

const useMyProfile = () => {
  const [dataMyProfile, setDataMyProfile] = useRecoilState(myProfileState);

  const request = () => {
    Auth.getMyProfile(setDataMyProfile);
  };

  useEffect(() => {
    return () => {
      Auth.cancelGetMyProfile();
    };
  }, []);

  return [dataMyProfile, request, setDataMyProfile];
};
export default useMyProfile;
