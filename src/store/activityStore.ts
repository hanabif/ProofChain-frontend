import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ActivityType = 'registration' | 'verification' | 'purchase' | 'request_sent' | 'request_received';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  subtitle: string;
  timestamp: number;
}

interface ActivityState {
  activities: ActivityItem[];
  addActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void;
  clearActivities: () => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activities: [],
      addActivity: (activity) => 
        set((state) => {
          const newItem: ActivityItem = {
            ...activity,
            id: Math.random().toString(36).substring(2, 9),
            // Store timestamp as milliseconds
            timestamp: Date.now(),
          };
          // Keep only the most recent 50 activities to avoid local storage bloat
          const newActivities = [newItem, ...state.activities].slice(0, 50);
          return { activities: newActivities };
        }),
      clearActivities: () => set({ activities: [] }),
    }),
    {
      name: 'proofchain-activity',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
