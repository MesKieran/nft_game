import React from 'react';
import { useState, useEffect } from 'react';
import Backpack from "../assets/images/dropdown/backpackIcon.png"
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import ToolRenderer from "../components/ToolRenderer";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const testinfo = [
    {
      id: 'gary',
      name: 'Gary Goodspeed',
      
    },
    {
      id: 'cato',
      name: 'Little Cato',
       
    },
    {
      id: 'kvn',
      name: 'KVN',
     
    },
    {
      id: 'mooncake',
      name: 'Mooncake',
     
    },
    {
      id: 'quinn',
      name: 'Quinn Ergon',
  
    }
  ]




function Dropdown(){
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const [seedNft, setSeedNft] = useState('');
    const [toolNft, setToolNft] = useState('');

    console.log(data);
    console.log(blockchain.account);

    const useTool = (_account, _id, _toolId) => {
        setLoading(true);
        blockchain.lipToken.methods
          .useTool(_account, _id, _toolId)
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
    

    

    const mintTool = (_account) => {
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

    

    useEffect(() => {
        if (blockchain.account != "" && blockchain.lipToken != null) {
        dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.lipToken]);

    const [open, setOpen] = useState(false);

    const toolData = data.allTools

    // hook for dragging components
    const [toolNfts, updateCharacters] = useState(data.allTools);
  
    function handleOnDragEnd(result) {
      if (!result.destination) return;
  
      const items = Array.from(toolData);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      updateCharacters(items);
    

    }

    //UseTool function

    function handleSeedNftChange(event){
      setSeedNft(event.target.value);
    }

    function handleToolNftChange(event){
      setToolNft(event.target.value);
    }

    
    return(
        <div>
            
            <div className="menu-container">
                <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>
                <img src={Backpack}></img>
                </div>
            </div>
            <div className={`dropdownMenu ${open? 'active':'inactive'}`}>
                <h3>Backpack<br/></h3>
                <ul>
                    
                    <li className="dropdownItem">
                        <button
                        className='watertool'
                        disabled={loading ? 1 : 0}
                        onClick={(e) => {
                        e.preventDefault();
                        mintTool(blockchain.account);
                        }}
                        >
                        MintTool
                        </button>
                        <img src={Backpack}></img>
                    </li>
                         
                </ul>
                <ul>
                  <li className="dropdownItem">
                    <form>
                        <label>
                          SeedId:
                          <input style={{width:"50px"}} type="number" value={seedNft} onChange={handleSeedNftChange}/>
                        </label>
                        <label>
                          SeedId:
                          <input style={{width:"50px"}} type="number" value={toolNft} onChange={handleToolNftChange}/>
                        </label>
                        <button
                        type="submit"
                        disabled={loading ? 1 : 0}
                        onClick={(e) => {
                        e.preventDefault();
                        parseInt(seedNft);
                        parseInt(toolNft)
                        useTool(blockchain.account, seedNft, toolNft);
                        }}
                        >
                        useTool
                        </button>
                        
                    </form>
                    </li>
                         
                </ul>
                
                <DragDropContext onDragEnd={handleOnDragEnd}>        
                <Droppable droppableId="characters">
                {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                {data.allOwnerTools.map((item, index) => {
                        return (
                            <Draggable key={index} draggableId={String(item.id)} index={index}>
                            {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                            {/* rendering the nft images */}
                            <ToolRenderer tool={item}/>
                            {/* <Modal/> */}
                            </div>
                            )}
                            </Draggable>
                        );
                    })}; 
                    {provided.placeholder}
                </ul>
                )}
                </Droppable>
                </DragDropContext>

            </div>
        </div>
    )

}



export default Dropdown