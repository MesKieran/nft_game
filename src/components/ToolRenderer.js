import React from "react";
// cards
import { parts } from "../parts/parts";
import * as s from "../styles/globalStyles";
import water from "../assets/images/tool/1.png"



const ToolRenderer = ({ tool = null, size = 120, style}) => {
  if (!tool) {
    return null;
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


  const toolStyle = {
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
      <img alt={"tool"} src={parts.tools[typeImg]} style={toolStyle} />
        
      </div>
    </div>
   
  );
};

export default ToolRenderer;
