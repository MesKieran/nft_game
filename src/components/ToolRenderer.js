import React from "react";
// cards
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";
import * as s from "../styles/globalStyles";
import water from "../assets/images/tool/1.png"



const ToolRenderer = ({ tool = null, size = 120, style}) => {
  if (!tool) {
    return null;
  }
  let rarity = _r1;

  if (tool.rarity >= 7) {
    rarity = _r2;
  }
  if (tool.rarity >= 9) {
    rarity = _r3;
  }
  let typeImg = 1;
  let type = tool.typeOfTool
  if (type === "water"){
    typeImg = 1;
  }else if(type === "scissor"){
    typeImg = 2;
  }
  else if(type === "fertilizer"){
    typeImg = 3;
  }


  const lipStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  return (
    <div>
      <s.TextDescription_2>Type: {tool.typeOfTool}</s.TextDescription_2>
      <s.TextDescription_3 >Id: {tool.id}</s.TextDescription_3>
      <div
        style={{
          minWidth: size,
          minHeight: size,
          background: "blue",
          position: "relative",
          ...style,
        }}
      >
      <img alt={"tool"} src={parts.tools[typeImg]} style={lipStyle} />
        
      </div>
    </div>
   
  );
};

export default ToolRenderer;
