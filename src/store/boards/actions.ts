import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { AppThunk } from "../types";

export const SAVE_ALL_BOARDS = "SAVE_ALL_BOARDS";

export const saveAllBoards = (boards: []) => {
  return {
    type: SAVE_ALL_BOARDS,
    payload: [...boards],
  };
};

export const fetchAllBoards = (): AppThunk => async (dispatch, getState) => {
  try {
    const response = await Axios.get(`${apiUrl}/boards`);

    if (response) {
      dispatch(saveAllBoards(response.data));
    }
  } catch (e) {
    console.log(e);
  }
};
