import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import NFTRenderer from "./components/NFTRenderer";
import _bgI from "./assets/images/bg/backgrounImg.png";
import Footer from './Webpage component/Footer';
import NavBar from "./Webpage component/Navbar";
import Dropdown from "./Webpage component/DropDown";
import Popup from "./Webpage component/Popup";
import './styles/Popup.css'

import AppleImg from "./assets/images/Popups/apple.webp";
import OrangeImg from "./assets/images/Popups/orange.jpg";
import PeachImg from "./assets/images/Popups/peach.webp";
import AloeImg from "./assets/images/Popups/Aloe.jpg";
import BanyanImg from "./assets/images/Popups/banyan.webp";
import BambooImg from "./assets/images/Popups/bamboo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'




import {Button} from 'bootstrap'





function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  // console.log(data);
  // console.log(blockchain.account);
  // console.log("sdads");
  // console.log(blockchain.lipToken);
  // console.log(blockchain.reward);
  

  const mintNFT = (_account, _name) => {
    setLoading(true);
    blockchain.lipToken.methods
      .createRandomLip(_name)
      .send({
        from: _account,
        value: blockchain.web3.utils.toWei("0.01", "ether"),
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  const mintToolNFT = (_account) => {
    setLoading(true);
    blockchain.lipToken.methods
      .createRandomTool()
      .send({
        from: _account,
        value: blockchain.web3.utils.toWei("0.001", "ether"),
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  const levelUpLip = (_account, _id) => {
    setLoading(true);
    blockchain.lipToken.methods
      .levelUp(_id)
      .send({
        from: _account,
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getReward = (_account, _id) => {
    setLoading(true);
    blockchain.reward.methods
      .claimRewards(_account,_id)
      .send({
        from: _account,
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getRarity = (_account, _id) => {
    setLoading(true);
    blockchain.reward.methods
      .getRarity(_id)
      .send({
        from: _account,
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  

  useEffect(() => {
    if (blockchain.account != "" && blockchain.lipToken != null && blockchain.reward != null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.lipToken]);

  let NFTTypeArray = ["Aloe Vera Seed", "Banyan Tree Seed", "Orange Seed", "Peach Seed", "Apple Seed", "Bamboo Seed",
  "Aloe Vera Bud", "Banyan Tree Bud", "Orange Bud", "Peach Bud", "Apple Bud", "Bamboo Bud",
  "Aloe Vera", "Banyan Tree", "Orange Tree", "Peach Tree", "Apple Tree", "Bamboo Tree"]

  // Pop up
  const[ApplebuttonPopup, setAppleButtonPopup] = useState(false);
  const[OrangebuttonPopup, setOrangeButtonPopup] = useState(false);
  const[BamboobuttonPopup, setBambooButtonPopup] = useState(false);
  const[PeachbuttonPopup, setPeachButtonPopup] = useState(false);
  const[AloebuttonPopup, setAloeButtonPopup] = useState(false);
  const[BanyanbuttonPopup, setBanyanButtonPopup] = useState(false);

  const [isHoveringProduction, setIsHoveringProduction] = useState(false);
  const handleMouseOverProduction = () => {
    setIsHoveringProduction(true);
  };
  const handleMouseOutProduction = () => {
    setIsHoveringProduction(false);
  };

  const [isHoveringLandUse, setIsHoveringLandUse] = useState(false);
  const handleMouseOverLandUse = () => {
    setIsHoveringLandUse(true);
  };
  const handleMouseOutLandUse = () => {
    setIsHoveringLandUse(false);
  };

  const [isHoveringCarbon, setIsHoveringCarbon] = useState(false);
  const handleMouseOverCarbon = () => {
    setIsHoveringCarbon(true);
  };
  const handleMouseOutCarbon = () => {
    setIsHoveringCarbon(false);
  };

  const [isHoveringHavest, setIsHoveringHavest] = useState(false);
  const handleMouseOverHavest = () => {
    setIsHoveringHavest(true);
  };
  const handleMouseOutHavest = () => {
    setIsHoveringHavest(false);
  };

  const [isHoveringWaste, setIsHoveringWaste] = useState(false);
  const handleMouseOverWaste = () => {
    setIsHoveringWaste(true);
  };
  const handleMouseOutWaste = () => {
    setIsHoveringWaste(false);
  };

  const [isHoveringTime, setIsHoveringTime] = useState(false);
  const handleMouseOverTime = () => {
    setIsHoveringTime(true);
  };
  const handleMouseOutTime = () => {
    setIsHoveringTime(false);
  };




  return (
    <s.Screen image={_bgI}>
      <NavBar/>
      {blockchain.account === "" || blockchain.lipToken === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"} style={{marginTop:"0px" }}>
          <s.TextTitle >Connect to the game</s.TextTitle>
          <s.SpacerSmall />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </button>
          <s.SpacerXSmall />
          {blockchain.errorMsg != "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container_mainpage ai={"center"} style={{ padding: "24px" }}>
          <s.TextTitle>Welcome to the game</s.TextTitle>
         
          <div style={{display:"flex", padding:"10px"}}>
          <button onClick={()=>setAppleButtonPopup(true)}>Apple</button>
          <button style={{marginLeft:"30px"}} onClick={()=>setOrangeButtonPopup(true)}>Orange</button>
          <button style={{marginLeft:"30px"}} onClick={()=>setBambooButtonPopup(true)}>Bamboo</button>
          <button style={{marginLeft:"30px"}} onClick={()=>setPeachButtonPopup(true)}>Peach</button>
          <button style={{marginLeft:"30px"}} onClick={()=>setAloeButtonPopup(true)}>Aloe</button>
          <button style={{marginLeft:"30px"}} onClick={()=>setBanyanButtonPopup(true)}>Banyan</button>
          </div>
          

          <Popup trigger={ApplebuttonPopup} setTrigger={setAppleButtonPopup}>
          <div class="plant-container">
            <img src={AppleImg} alt="Plant Image" class="plant-image"/>
            <div class="plant-description">
              <h2>Apple Tree</h2>
              <div style={{display:"flex"}}>
              <p>Rating: <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></p>
              </div>
              <div style={{display:"flex"}}>
              <p>Production emissions</p><p onMouseOver={handleMouseOverProduction}
                onMouseOut={handleMouseOutProduction} style={{color:"red"}}>(?)</p> <p>: 0.41KG CO2 / KG of Apple</p>
                {isHoveringProduction && <div className="Description_Detail"><p>This includes emissions from the cultivation of the plant, such as fertilizers and pesticides, as well as emissions from transportation, packaging, and processing.</p></div>}
              </div>
              <div style={{display:"flex"}}>
              <p>Land use</p><p onMouseOver={handleMouseOverLandUse}
                onMouseOut={handleMouseOutLandUse} style={{color:"red"}}>(?)</p> <p>: 100 and 300 trees per acre</p>
                {isHoveringLandUse && <p className="Description_Detail">The amount of land required to produce the plant, as well as any land use changes associated with its production.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Carbon absorption</p><p onMouseOver={handleMouseOverCarbon}
                onMouseOut={handleMouseOutCarbon} style={{color:"red"}}>(?)</p> <p>: 49 KG CO2 / year / tree (14.7 tons / acre)</p>
                {isHoveringCarbon && <p className="Description_Detail">The amount of carbon that the plant absorbs during its growth, including both above-ground biomass and below-ground root systems.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Harvesting emissions</p><p onMouseOver={handleMouseOverHavest}
                onMouseOut={handleMouseOutHavest} style={{color:"red"}}>(?)</p> <p>: 0.18 KG CO2 / liter of product.</p>
                {isHoveringHavest && <p className="Description_Detail">The emissions associated with harvesting and processing the plant, such as fuel used in machinery and equipment.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Waste emissions</p><p onMouseOver={handleMouseOverWaste}
                onMouseOut={handleMouseOutWaste} style={{color:"red"}}>(?)</p> <p>: The emissions associated with the disposal of apple trees can vary depending on the specific disposal method used. For example, burning apple wood can release carbon emissions into the atmosphere, while composting can sequester carbon in the soil.</p>
                {isHoveringWaste && <p className="Description_Detail">The emissions associated with the disposal of the plant, including any decomposition or incineration.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Timeframe</p><p onMouseOver={handleMouseOverTime}
                onMouseOut={handleMouseOutTime} style={{color:"red"}}>(?)</p> <p>: The timeframe over which an apple tree's carbon footprint is being assessed can vary depending on the specific research question.</p>
                {isHoveringTime && <p className="Description_Detail">The timeframe over which the plant's carbon footprint is being assessed, such as annual emissions or over the entire lifespan of the plant.</p>}
              </div>
            </div>
          </div>
          </Popup>

          
          <Popup trigger={OrangebuttonPopup} setTrigger={setOrangeButtonPopup}>
          <div class="plant-container">
            <img src={OrangeImg} alt="Plant Image" class="plant-image"/>
            <div class="plant-description">
              <h2>Orange Tree</h2>
              <div style={{display:"flex"}}>
              <p>Rating:  <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></p>
              </div>
              <div style={{display:"flex"}}>
              <p>Production emissions</p><p onMouseOver={handleMouseOverProduction}
                onMouseOut={handleMouseOutProduction} style={{color:"red"}}>(?)</p> <p>: 0.51KG CO2 / KG of Orange</p>
                {isHoveringProduction && <div className="Description_Detail"><p>This includes emissions from the cultivation of the plant, such as fertilizers and pesticides, as well as emissions from transportation, packaging, and processing.</p></div>}
              </div>
              <div style={{display:"flex"}}>
              <p>Land use</p><p onMouseOver={handleMouseOverLandUse}
                onMouseOut={handleMouseOutLandUse} style={{color:"red"}}>(?)</p> <p>: 100 and 150 trees per acre</p>
                {isHoveringLandUse && <p className="Description_Detail">The amount of land required to produce the plant, as well as any land use changes associated with its production.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Carbon absorption</p><p onMouseOver={handleMouseOverCarbon}
                onMouseOut={handleMouseOutCarbon} style={{color:"red"}}>(?)</p> <p>: 21 KG CO2 / year / tree (3.15 tonnes / acre)</p>
                {isHoveringCarbon && <p className="Description_Detail">The amount of carbon that the plant absorbs during its growth, including both above-ground biomass and below-ground root systems.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Harvesting emissions</p><p onMouseOver={handleMouseOverHavest}
                onMouseOut={handleMouseOutHavest} style={{color:"red"}}>(?)</p> <p>: 0.21 KG CO2 / liter of product.</p>
                {isHoveringHavest && <p className="Description_Detail">The emissions associated with harvesting and processing the plant, such as fuel used in machinery and equipment.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Waste emissions</p><p onMouseOver={handleMouseOverWaste}
                onMouseOut={handleMouseOutWaste} style={{color:"red"}}>(?)</p> <p>: The emissions associated with the disposal of orange trees can vary depending on the specific disposal method used. For example, burning orange wood can release carbon emissions into the atmosphere, while composting can sequester carbon in the soil.</p>
                {isHoveringWaste && <p className="Description_Detail">The emissions associated with the disposal of the plant, including any decomposition or incineration.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Timeframe</p><p onMouseOver={handleMouseOverTime}
                onMouseOut={handleMouseOutTime} style={{color:"red"}}>(?)</p> <p>: The timeframe over which an orange tree's carbon footprint is being assessed can vary depending on the specific research question.</p>
                {isHoveringTime && <p className="Description_Detail">The timeframe over which the plant's carbon footprint is being assessed, such as annual emissions or over the entire lifespan of the plant.</p>}
              </div>
            </div>
          </div>
          </Popup>

          <Popup trigger={BamboobuttonPopup} setTrigger={setBambooButtonPopup}>
          <div class="plant-container">
            <img src={BambooImg} alt="Plant Image" class="plant-image"/>
            <div class="plant-description">
              <h2>Bamboo</h2>
              <div style={{display:"flex"}}>
              <p>Rating: <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></p>
              </div>
              <div style={{display:"flex"}}>
              <p>Production emissions</p><p onMouseOver={handleMouseOverProduction}
                onMouseOut={handleMouseOutProduction} style={{color:"red"}}>(?)</p> <p>: 1.1KG CO2 / square meter of bamboo</p>
                {isHoveringProduction && <div className="Description_Detail"><p>This includes emissions from the cultivation of the plant, such as fertilizers and pesticides, as well as emissions from transportation, packaging, and processing.</p></div>}
              </div>
              <div style={{display:"flex"}}>
              <p>Land use</p><p onMouseOver={handleMouseOverLandUse}
                onMouseOut={handleMouseOutLandUse} style={{color:"red"}}>(?)</p> <p>: According to the World Bamboo Organization, bamboo can yield up to 20 times more timber per hectare compared to other trees.</p>
                {isHoveringLandUse && <p className="Description_Detail">The amount of land required to produce the plant, as well as any land use changes associated with its production.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Carbon absorption</p><p onMouseOver={handleMouseOverCarbon}
                onMouseOut={handleMouseOutCarbon} style={{color:"red"}}>(?)</p> <p>: 70 tonnes / hectare (28 tonnes / acre)</p>
                {isHoveringCarbon && <p className="Description_Detail">The amount of carbon that the plant absorbs during its growth, including both above-ground biomass and below-ground root systems.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Harvesting emissions</p><p onMouseOver={handleMouseOverHavest}
                onMouseOut={handleMouseOutHavest} style={{color:"red"}}>(?)</p> <p>: Compared to other materials such as wood or steel, bamboo requires less energy to process due to its natural strength and flexibility.</p>
                {isHoveringHavest && <p className="Description_Detail">The emissions associated with harvesting and processing the plant, such as fuel used in machinery and equipment.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Waste emissions</p><p onMouseOver={handleMouseOverWaste}
                onMouseOut={handleMouseOutWaste} style={{color:"red"}}>(?)</p> <p>: Bamboo is biodegradable, and therefore the emissions associated with its disposal are minimal. Additionally, bamboo can be composted, which can help sequester carbon in the soil.</p>
                {isHoveringWaste && <p className="Description_Detail">The emissions associated with the disposal of the plant, including any decomposition or incineration.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Timeframe</p><p onMouseOver={handleMouseOverTime}
                onMouseOut={handleMouseOutTime} style={{color:"red"}}>(?)</p> <p>: The timeframe over which a bamboo product's carbon footprint is being assessed can vary depending on the specific research question.</p>
                {isHoveringTime && <p className="Description_Detail">The timeframe over which the plant's carbon footprint is being assessed, such as annual emissions or over the entire lifespan of the plant.</p>}
              </div>
            </div>
          </div>
          </Popup>

          <Popup trigger={PeachbuttonPopup} setTrigger={setPeachButtonPopup}>
          <div class="plant-container">
            <img src={PeachImg} alt="Plant Image" class="plant-image"/>
            <div class="plant-description">
              <h2>Peach Tree</h2>
              <div style={{display:"flex"}}>
              <p>Rating: <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></p>
              </div>
              <div style={{display:"flex"}}>
              <p>Production emissions</p><p onMouseOver={handleMouseOverProduction}
                onMouseOut={handleMouseOutProduction} style={{color:"red"}}>(?)</p> <p>: 0.32KG CO2 / KG of Peach</p>
                {isHoveringProduction && <div className="Description_Detail"><p>This includes emissions from the cultivation of the plant, such as fertilizers and pesticides, as well as emissions from transportation, packaging, and processing.</p></div>}
              </div>
              <div style={{display:"flex"}}>
              <p>Land use</p><p onMouseOver={handleMouseOverLandUse}
                onMouseOut={handleMouseOutLandUse} style={{color:"red"}}>(?)</p> <p>: 75 and 200 trees per acre</p>
                {isHoveringLandUse && <p className="Description_Detail">The amount of land required to produce the plant, as well as any land use changes associated with its production.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Carbon absorption</p><p onMouseOver={handleMouseOverCarbon}
                onMouseOut={handleMouseOutCarbon} style={{color:"red"}}>(?)</p> <p>: 50 KG / tree / year (10 tonnes per acre)</p>
                {isHoveringCarbon && <p className="Description_Detail">The amount of carbon that the plant absorbs during its growth, including both above-ground biomass and below-ground root systems.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Harvesting emissions</p><p onMouseOver={handleMouseOverHavest}
                onMouseOut={handleMouseOutHavest} style={{color:"red"}}>(?)</p> <p>: 0.17 KG CO2 / liter of product.</p>
                {isHoveringHavest && <p className="Description_Detail">The emissions associated with harvesting and processing the plant, such as fuel used in machinery and equipment.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Waste emissions</p><p onMouseOver={handleMouseOverWaste}
                onMouseOut={handleMouseOutWaste} style={{color:"red"}}>(?)</p> <p>: The emissions associated with the disposal of peach trees can vary depending on the specific disposal method used. For example, burning peach wood can release carbon emissions into the atmosphere, while composting can sequester carbon in the soil. However, specific statistics on the emissions associated with peach tree disposal are not widely available.</p>
                {isHoveringWaste && <p className="Description_Detail">The emissions associated with the disposal of the plant, including any decomposition or incineration.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Timeframe</p><p onMouseOver={handleMouseOverTime}
                onMouseOut={handleMouseOutTime} style={{color:"red"}}>(?)</p> <p>: The timeframe over which a peach tree's carbon footprint is being assessed can vary depending on the specific research question.</p>
                {isHoveringTime && <p className="Description_Detail">The timeframe over which the plant's carbon footprint is being assessed, such as annual emissions or over the entire lifespan of the plant.</p>}
              </div>
            </div>
          </div>
          </Popup>

          <Popup trigger={AloebuttonPopup} setTrigger={setAloeButtonPopup}>
          <div class="plant-container">
            <img src={AloeImg} alt="Plant Image" class="plant-image"/>
            <div class="plant-description">
              <h2>Aloe Vera</h2>
              <div style={{display:"flex"}}>
              <p>Rating: <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></p>
              </div>
              <div style={{display:"flex"}}>
              <p>Production emissions</p><p onMouseOver={handleMouseOverProduction}
                onMouseOut={handleMouseOutProduction} style={{color:"red"}}>(?)</p> <p>: 0.54KG CO2 / KG of Aloe Vera</p>
                {isHoveringProduction && <div className="Description_Detail"><p>This includes emissions from the cultivation of the plant, such as fertilizers and pesticides, as well as emissions from transportation, packaging, and processing.</p></div>}
              </div>
              <div style={{display:"flex"}}>
              <p>Land use</p><p onMouseOver={handleMouseOverLandUse}
                onMouseOut={handleMouseOutLandUse} style={{color:"red"}}>(?)</p> <p>: 12.14 tonnes per acre (10890 per acre assuming spacing 2 feet)</p>
                {isHoveringLandUse && <p className="Description_Detail">The amount of land required to produce the plant, as well as any land use changes associated with its production.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Carbon absorption</p><p onMouseOver={handleMouseOverCarbon}
                onMouseOut={handleMouseOutCarbon} style={{color:"red"}}>(?)</p> <p>: a few pounds of carbon dioxide / year (assume 3 pounds) (14.81 tonnes per acre)</p>
                {isHoveringCarbon && <p className="Description_Detail">The amount of carbon that the plant absorbs during its growth, including both above-ground biomass and below-ground root systems.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Harvesting emissions</p><p onMouseOver={handleMouseOverHavest}
                onMouseOut={handleMouseOutHavest} style={{color:"red"}}>(?)</p> <p>: 0.29 KG CO2 / liter of product.</p>
                {isHoveringHavest && <p className="Description_Detail">The emissions associated with harvesting and processing the plant, such as fuel used in machinery and equipment.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Waste emissions</p><p onMouseOver={handleMouseOverWaste}
                onMouseOut={handleMouseOutWaste} style={{color:"red"}}>(?)</p> <p>: The emissions associated with the disposal of Aloe vera leaves can vary depending on the specific disposal method used. For example, composting Aloe vera leaves can help sequester carbon in the soil. However, specific statistics on the emissions associated with Aloe vera leaf disposal are not widely available.</p>
                {isHoveringWaste && <p className="Description_Detail">The emissions associated with the disposal of the plant, including any decomposition or incineration.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Timeframe</p><p onMouseOver={handleMouseOverTime}
                onMouseOut={handleMouseOutTime} style={{color:"red"}}>(?)</p> <p>: The timeframe over which Aloe vera's carbon footprint is being assessed can vary depending on the specific research question.</p>
                {isHoveringTime && <p className="Description_Detail">The timeframe over which the plant's carbon footprint is being assessed, such as annual emissions or over the entire lifespan of the plant.</p>}
              </div>
            </div>
          </div>
          </Popup>


          <Popup trigger={BanyanbuttonPopup} setTrigger={setBanyanButtonPopup}>
          <div class="plant-container">
            <img src={BanyanImg} alt="Plant Image" class="plant-image"/>
            <div class="plant-description">
              <h2>Banyan Tree</h2>
              <div style={{display:"flex"}}>
              <p>Rating: <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></p>
              </div>
              <div style={{display:"flex"}}>
              <p>Production emissions</p><p onMouseOver={handleMouseOverProduction}
                onMouseOut={handleMouseOutProduction} style={{color:"red"}}>(?)</p> <p>: The carbon emissions associated with Banyan tree production are minimal as Banyan trees grow in the wild without any human intervention.</p>
                {isHoveringProduction && <div className="Description_Detail"><p>This includes emissions from the cultivation of the plant, such as fertilizers and pesticides, as well as emissions from transportation, packaging, and processing.</p></div>}
              </div>
              <div style={{display:"flex"}}>
              <p>Land use</p><p onMouseOver={handleMouseOverLandUse}
                onMouseOut={handleMouseOutLandUse} style={{color:"red"}}>(?)</p> <p>: 60 trees per acre (assume spacing is 50 feet)</p>
                {isHoveringLandUse && <p className="Description_Detail">The amount of land required to produce the plant, as well as any land use changes associated with its production.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Carbon absorption</p><p onMouseOver={handleMouseOverCarbon}
                onMouseOut={handleMouseOutCarbon} style={{color:"red"}}>(?)</p> <p>:  190 KG / tree / year (assume full grown) (11.4 tonnes per acre)</p>
                {isHoveringCarbon && <p className="Description_Detail">The amount of carbon that the plant absorbs during its growth, including both above-ground biomass and below-ground root systems.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Harvesting emissions</p><p onMouseOver={handleMouseOverHavest}
                onMouseOut={handleMouseOutHavest} style={{color:"red"}}>(?)</p> <p>: Banyan trees are not harvested or processed for commercial purposes, so there are no carbon emissions associated with these activities.</p>
                {isHoveringHavest && <p className="Description_Detail">The emissions associated with harvesting and processing the plant, such as fuel used in machinery and equipment.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Waste emissions</p><p onMouseOver={handleMouseOverWaste}
                onMouseOut={handleMouseOutWaste} style={{color:"red"}}>(?)</p> <p>: The emissions associated with the disposal of Banyan tree waste, such as leaves and branches, can vary depending on the specific disposal method used. For example, composting Banyan tree waste can help sequester carbon in the soil. However, specific statistics on the emissions associated with Banyan tree waste disposal are not widely available.</p>
                {isHoveringWaste && <p className="Description_Detail">The emissions associated with the disposal of the plant, including any decomposition or incineration.</p>}
              </div>
              <div style={{display:"flex"}}>
              <p>Timeframe</p><p onMouseOver={handleMouseOverTime}
                onMouseOut={handleMouseOutTime} style={{color:"red"}}>(?)</p> <p>: Timeframe: The timeframe over which a Banyan tree's carbon footprint is being assessed can vary depending on the specific research question. </p>
                {isHoveringTime && <p className="Description_Detail">The timeframe over which the plant's carbon footprint is being assessed, such as annual emissions or over the entire lifespan of the plant.</p>}
              </div>
            </div>
          </div>
          </Popup>
          


          
          <s.SpacerSmall />
          <div style={{display:"flex"}}>
          <button style={{margin:"5px"}}
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintNFT(blockchain.account, "Unknown");
            }}
          >
            BUY NFT SEED
          </button>
          <button
            style={{margin:"5px"}}
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintToolNFT(blockchain.account);
            }}
          >
            BUY NFT TOOL
          </button>

          {/* {console.log("sds"+data._allLips)}
          {console.log("sd"+data.allOwnerLips)}
          <span>{data._allLips}</span>
          <span>{data.allOwnerLips}</span> */}
          
          </div>
          <Dropdown/>
  
          <s.TextDescription>Number Of NFTs: {data.allOwnerLips.length}</s.TextDescription>
          <s.TextDescription>TST coin: {data.balanceOfTST}</s.TextDescription>
          
          {/* <s.TextDescription>Number Of Tools: {}</s.TextDescription> */}
          <s.SpacerMedium />
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
            {data.allLips.map((item, index) => {
              let experienceNeeded = 0;
              if(item.rarity<=20){
                experienceNeeded = 10;
              }
              if(item.rarity>20 && item.rarity<=40){
                experienceNeeded = 8;
              }
              if(item.rarity>40 && item.rarity<=60){
                experienceNeeded = 6;
              }
              if(item.rarity>60 && item.rarity<=80){
                experienceNeeded = 4;
              }
              if(item.rarity>80 && item.rarity<=100){
                experienceNeeded = 3;
              }
              let NFTType = item.dna.substring(4, 6) % 6 + (item.level-1)*6;
              return (
                <s.Container key={index} style={{ padding: "15px"}}>
                  {/* rendering the nft images */}
                  
                  <NFTRenderer lip={item} PassType={NFTType}/>
                  {/* <Modal/> */}
                
                  <s.SpacerXSmall />
                  <s.Container>
                    <s.TextDescription>ID: {item.id}</s.TextDescription>
                    <s.TextDescription>DNA: {item.dna}</s.TextDescription>
                    <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
                    <s.TextDescription>NAME: {NFTTypeArray[NFTType]}</s.TextDescription>
                    <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                    <s.TextDescription>Experience: {item.ableToLevel} "Need  <s.TextDescription style={{color:"red"}}>{experienceNeeded}</s.TextDescription> experience to Level"</s.TextDescription>
                    <s.SpacerXSmall />
                    <button
                      disabled={loading ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        levelUpLip(blockchain.account, item.id);
                      }}
                    >
                    
                      Level Up
                    </button>
                    <button
                      disabled={loading ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        getReward(blockchain.account, item.id);
                      }}
                    >
                      GetReward
                    </button>
                    {/* <button
                      disabled={loading ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(WaitingTime(blockchain.account, item.id));
                      }}
                    >
                      GetWaitingTime
                    </button> */}
                    <s.TextDescription>WaitingTime: 30s</s.TextDescription>
                    

                  </s.Container>
                </s.Container>
              );
            })}
          </s.Container>
        </s.Container_mainpage>
      )}
    <Footer/>
    </s.Screen>
    
  );
}



export default App;


