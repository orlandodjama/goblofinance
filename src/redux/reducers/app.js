const initialState = {
    id: ""
  };
  export default (state = initialState, action) => {
     switch (action.type) {
       case "ADD_TODO":
         return (state = {
           ...state,
           todoItem: action.payload.content
         });
       default:
         return state;
     }
  };