import React from "react";
// cards
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";
import * as s from "../styles/globalStyles";





const NFTRenderer = ({ plant = null, size = 250, style, PassType }) => {
  if (!plant) {
    return null;
  }
  let rarity = _r1;

  if (plant.rarity >= 50) {
    rarity = _r2;
  }
  if (plant.rarity >= 80) {
    rarity = _r3;
  }

  let dnaStr = String(plant.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;
  let plantDeatils={
    bg: dnaStr.substring(0, 2) % 6 ,
    mask: dnaStr.substring(2, 4) % 5,
    line: PassType,
    addon: dnaStr.substring(6, 8) % 5,
    addonMouth1: dnaStr.substring(8, 10) % 5,
    addonMouth2: dnaStr.substring(10, 12) % 5,
    addonMouth3: dnaStr.substring(12, 14) % 5,
    name: plant.name,
  }

  const plantStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };
  const plantStyleBackground = {
    opacity:"0.6",
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        backgroundColor: "black",
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={parts.bg[plantDeatils.bg]} style={plantStyleBackground} />
      <img alt={"mask"} src={parts.mask[plantDeatils.mask]} style={plantStyle} />
      <img alt={"line"} src={parts.line[plantDeatils.line]} style={plantStyle} />
      <img alt={"addon"} src={parts.addon[plantDeatils.addon]} style={plantStyle} />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth1[plantDeatils.addonMouth1]}
        style={plantStyle}
      />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth2[plantDeatils.addonMouth2]}
        style={plantStyle}
      />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth3[plantDeatils.addonMouth3]}
        style={plantStyle}
      />
      <img alt={"rarity"} src={rarity} style={plantStyle} />
    </div>
  );
};

export default NFTRenderer;


