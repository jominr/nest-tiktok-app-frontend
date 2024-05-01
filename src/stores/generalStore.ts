import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface GenerateState {
  isLoginOpen: boolean;
  isEditProfileOpen: boolean;
  selectedPosts: null;
  ids: null;
  isBackUrl: "/";
  posts: null;
  suggested: null;
}

export interface GeneralActions {
  setLoginIsOpen: (isLoginOpen: boolean) => void;
  setIsEditProfileOpen: () => void
}

export const useGeneralStore = create<GenerateState & GeneralActions>()(
  devtools(
    // automatically store the data in local stroage
    persist(
      (set) => ({
        isLoginOpen: false,
        isEditProfileOpen: false,
        selectedPosts: null,
        ids: null,
        isBackUrl: "/",
        posts: null,
        suggested: null,

        setLoginIsOpen: (isLoginOpen: boolean) => {
          set({ isLoginOpen })
        },
        setIsEditProfileOpen: () => {
          return set((state)=> ({
            isEditProfileOpen: !state.isEditProfileOpen,
          }))
        }
      }),
      { // named localstroage
        name: "general-storage"
      }
    )
  )
)

export default useGeneralStore