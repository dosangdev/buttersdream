import { create } from "zustand";

interface AnimationState {
  isInitialAnimation: boolean;
  setInitialAnimation: (value: boolean) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isInitialAnimation: true,
  setInitialAnimation: (value) => set({ isInitialAnimation: value }),
}));
