import React, { useEffect, useState } from "react";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import LipRenderer from "./components/lipRenderer";
import _bgI from "./assets/images/bg/backgrounImg.png";
import Footer from './Webpage component/Footer';
import NavBar from "./Webpage component/Navbar";
import Dropdown from "./Webpage component/DropDown";



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

  return (
    <s.Screen image={_bgI}>
      <NavBar/>
      {blockchain.account === "" || blockchain.lipToken === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"} style={{marginTop:"-1500px" }}>
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
          <s.SpacerSmall />
          <button
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintNFT(blockchain.account, "Unknown");
            }}
          >
            BUY NFT SEED
          </button>
          <button
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintToolNFT(blockchain.account);
            }}
          >
            BUY NFT TOOL
          </button>
          <span>{data.allTools}</span>
          <span>{data.allOwnerTools}</span>
         
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
              return (
                <s.Container key={index} style={{ padding: "15px" }}>
                  {/* rendering the nft images */}
                 
                  <LipRenderer lip={item}/>
                  {/* <Modal/> */}
                
                  <s.SpacerXSmall />
                  <s.Container>
                    <s.TextDescription>ID: {item.id}</s.TextDescription>
                    <s.TextDescription>DNA: {item.dna}</s.TextDescription>
                    <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
                    <s.TextDescription>NAME: {item.name}</s.TextDescription>
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
