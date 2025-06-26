import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, actions) => actions.payload,
    removeConnection: () => null,
  },
});
export const { addConnections , removeConnection} = connectionSlice.actions;

export default connectionSlice.reducer;
