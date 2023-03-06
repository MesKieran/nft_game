import React, { useEffect, useState } from "react";
import "./App.css";
import AppleImg from "./assets/images/Popups/apple.webp"
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



import {Button} from 'bootstrap'





function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  console.log(data);
  console.log(blockchain.account);

  const getBalance = (_account) => {
    setLoading(true);
    blockchain.lipToken.methods
      .balanceOf(_account)
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

  useEffect(() => {
    if (blockchain.account != "" && blockchain.lipToken != null) {
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
        <s.Container flex={1} ai={"center"} jc={"center"} style={{marginTop:"-200px" }}>
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
        <s.Container ai={"center"} style={{ padding: "24px" }}>
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
                onMouseOut={handleMouseOutCarbon} style={{color:"red"}}>(?)</p> <p>: 49 KG CO2 / year</p>
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
            <h3>Orange</h3>
          </Popup>

          <Popup trigger={BamboobuttonPopup} setTrigger={setBambooButtonPopup}>
            <h3>Bamboo</h3>
          </Popup>

          <Popup trigger={PeachbuttonPopup} setTrigger={setPeachButtonPopup}>
            <h3>Peach</h3>
          </Popup>

          <Popup trigger={AloebuttonPopup} setTrigger={setAloeButtonPopup}>
            <h3>Aloe Vera</h3>
          </Popup>


          <Popup trigger={BanyanbuttonPopup} setTrigger={setBanyanButtonPopup}>
            <h3>Banyan</h3>
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
          {/* <span>{data.allTools}</span>
          <span>{data.allOwnerTools}</span> */}
          </div>
          <Dropdown/>
  
          <s.TextDescription>Number Of NFTs: {data.allOwnerLips.length}</s.TextDescription>
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
                  </s.Container>
                </s.Container>
              );
            })}
          </s.Container>
        </s.Container>
      )}
    <Footer/>
    </s.Screen>
    
  );
}



export default App;
