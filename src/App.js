import "antd/dist/antd.css";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { ButtonH44kBlueDark, ButtonH56Orange } from "./ui-source/button";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { InputNumberUI, InputText, TextAreaUI } from "./ui-source/input";
import { RecoilRoot } from "recoil";
import {
  BoldText,
  HeadText,
  LinkText,
  NormalText,
  TitleText,
} from "./ui-source/text";
import { TableUI } from "./ui-source/table";
import { Columns } from "./ui-source/colunm";
import { FormUI } from "./ui-source/form";
import FormItem from "antd/lib/form/FormItem";
import { Form, Input, Button, Checkbox, Dropdown } from "antd";
import { MenuItem, MenuUI } from "./ui-source/menu";
import { PaginationUI } from "./ui-source/pagination";
import UserLogin from "./ui-pages/login";
import Home from "./ui-pages/home";
import { userInfoState } from "./store/auth/share-state";
import { getUserInfo, saveUserInfoStore } from "./app-helper";
import useSignInWithPo from "./store/auth/use-signin-with-po";
import { AdminLayout } from "./ui-pages/admin";

const PageNotFound = () => {
  // Redirect to home instead of show 404;
  // console.log("ok");
  return <Redirect to={"/home"} />;
};

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null ? "" : decodeURIComponent(results[1]);
}

function RouteRoot() {
  const userInfoData = useRecoilValue(userInfoState);

  const [isVerified, setVerify] = useState(false);

  useEffect(() => {
    if (userInfoData.token) {
      saveUserInfoStore({
        token: userInfoData.token,
      });
    }
    setVerify(true);
  }, [userInfoData]);

  return (
    <Switch>
      <Route exact path={"/login"} component={UserLogin}></Route>
      <Route
        render={() => {
          if (!isVerified) {
            return <Redirect to="/login"></Redirect>;
          }
          return (
            <AdminLayout>
              <Switch>
                <Route exact path="/home" component={Home}></Route>
                <Route component={PageNotFound}></Route>
              </Switch>
            </AdminLayout>
          );
        }}
      ></Route>
    </Switch>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <RouteRoot></RouteRoot>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
