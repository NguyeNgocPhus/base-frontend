import "./App.css";
import { ButtonH44kBlueDark, ButtonH56Orange } from "./ui-source/button";
import "./App.css";
import {InputNumberUI, InputText, TextAreaUI} from "./ui-source/input";
import {BoldText, HeadText, LinkText, NormalText, TitleText} from "./ui-source/text";
function App() {
  return (
    <div className="App">
      <ButtonH56Orange htmlType="submit" className="btn-dismiss">
        helllllllllllo s
      </ButtonH56Orange>
      <ButtonH44kBlueDark className="btn-dismiss">hello</ButtonH44kBlueDark>
      <InputText></InputText>
      <InputNumberUI></InputNumberUI>
      <TextAreaUI></TextAreaUI>
      <NormalText>dsssssssssssssssssssss</NormalText>
      <BoldText>hellllllllllllllllo</BoldText>
      <LinkText href={"#"}>dcm</LinkText>
      <TitleText className="title" level={9}>dcmmmmmmmmmmmmmmmmmmmm</TitleText>
      <HeadText className="header" level={1}>header</HeadText>
    </div>
  );
}

export default App;
