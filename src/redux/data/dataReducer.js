const initialState = {
  loading: false,
  allLips: [],
  balanceOfTST: [],
  allOwnerLips: [],
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
        allLips: action.payload.allLips,
        balanceOfTST:action.payload.balanceOfTST,
        allOwnerLips: action.payload.allOwnerLips,
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
