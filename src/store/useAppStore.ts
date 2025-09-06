import {create} from 'zustand'
import { devtools } from 'zustand/middleware';
import { createRecipesSlices, type RecipesSliceType } from "./recipeSlice";
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice';
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice';

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlices(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))