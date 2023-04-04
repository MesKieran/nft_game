const initialState = {
  loading: false,
  allPlants: [],
  balanceOfTST: [],
  allOwnerPlants: [],
  allTools: [],
  allOwnerTools:[],
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        allPlants: action.payload.allPlants,
        balanceOfTST:action.payload.balanceOfTST,
        allOwnerPlants: action.payload.allOwnerPlants,
        allTools: action.payload.allTools,
        allOwnerTools: action.payload.allOwnerTools,
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
