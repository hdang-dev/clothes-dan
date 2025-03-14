import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IWishListItem } from '@/interfaces';

const initialState: IWishListItem[] = [];

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addWishListItem: (state, action: PayloadAction<IProduct>) => {
      state.push({ product: action.payload, count: 1 });
    },
    removeWishListItem: (state, action: PayloadAction<IProduct>) => {
      return state.filter(item => item.product.id !== action.payload.id);
    },
    changeWishListItem: (state, action: PayloadAction<IWishListItem>) => {
      const selectedItem = state.find(item => item.product.id === action.payload.product.id);
      if (selectedItem) {
        selectedItem.count = action.payload.count;
      }
    },
  }
});

export const { addWishListItem, removeWishListItem, changeWishListItem } = wishListSlice.actions;
export const wishListReducer = wishListSlice.reducer;