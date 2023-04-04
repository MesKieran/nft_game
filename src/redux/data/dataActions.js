// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let allPlants = await store
        .getState()
        .blockchain.plantNFT.methods.getPlants()
        .call();
      let allOwnerPlants = await store
        .getState()
        .blockchain.plantNFT.methods.getOwnerPlants(account)
        .call();
      let allTools = await store
        .getState()
        .blockchain.plantNFT.methods.getTools()
        .call();
      let allOwnerTools = await store
        .getState()
        .blockchain.plantNFT.methods.getOwnerTools(account)
        .call();
      let balanceOfTST = await store
        .getState()
        .blockchain.reward.methods.ReturnBalance(account)
        .call();
      dispatch(
        fetchDataSuccess({
          allPlants,
          balanceOfTST,
          allOwnerPlants,
          allTools,
          allOwnerTools,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};




