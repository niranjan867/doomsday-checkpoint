import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  UserProgressState,
  WatchStatus,
  ClassificationImportance,
} from './types';

interface ProgressStore extends UserProgressState {
  // Actions
  setStatus: (checkpointId: string, status: WatchStatus) => void;
  markWatched: (checkpointId: string) => void;
  markInProgress: (checkpointId: string) => void;
  markUnwatched: (checkpointId: string) => void;
  setNotes: (checkpointId: string, notes: string) => void;
  setLastActive: (checkpointId: string | null) => void;
  toggleSpoilers: () => void;
  setShowSpoilers: (show: boolean) => void;
  setFilterType: (type: 'all' | 'Movie' | 'TV Show' | 'Special') => void;
  setFilterImportance: (importance: 'all' | ClassificationImportance) => void;
  resetAllProgress: () => void;
}

const initialState: UserProgressState = {
  version: 1,
  checkpoints: {},
  lastActiveCheckpointId: null,
  showSpoilers: false,
  preferences: {
    reducedMotion: false,
    filterType: 'all',
    filterImportance: 'all',
  },
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStatus: (checkpointId: string, status: WatchStatus) => {
        set((state) => ({
          checkpoints: {
            ...state.checkpoints,
            [checkpointId]: {
              ...(state.checkpoints[checkpointId] || {}),
              status,
              updatedAt: new Date().toISOString(),
            },
          },
          lastActiveCheckpointId: checkpointId,
        }));
      },

      markWatched: (checkpointId: string) => {
        get().setStatus(checkpointId, 'watched');
      },

      markInProgress: (checkpointId: string) => {
        get().setStatus(checkpointId, 'in_progress');
      },

      markUnwatched: (checkpointId: string) => {
        get().setStatus(checkpointId, 'unwatched');
      },

      setNotes: (checkpointId: string, notes: string) => {
        set((state) => ({
          checkpoints: {
            ...state.checkpoints,
            [checkpointId]: {
              ...(state.checkpoints[checkpointId] || { status: 'unwatched' }),
              notes,
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },

      setLastActive: (checkpointId: string | null) => {
        set({ lastActiveCheckpointId: checkpointId });
      },

      toggleSpoilers: () => {
        set((state) => ({ showSpoilers: !state.showSpoilers }));
      },

      setShowSpoilers: (show: boolean) => {
        set({ showSpoilers: show });
      },

      setFilterType: (type) => {
        set((state) => ({
          preferences: { ...state.preferences, filterType: type },
        }));
      },

      setFilterImportance: (importance) => {
        set((state) => ({
          preferences: { ...state.preferences, filterImportance: importance },
        }));
      },

      resetAllProgress: () => {
        set({
          checkpoints: {},
          lastActiveCheckpointId: null,
        });
      },
    }),
    {
      name: 'doomsday_checkpoint_user_state_v1',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({
        version: state.version,
        checkpoints: state.checkpoints,
        lastActiveCheckpointId: state.lastActiveCheckpointId,
        showSpoilers: state.showSpoilers,
        preferences: state.preferences,
      }),
    }
  )
);
