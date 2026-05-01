import {create} from "zustand";

// model App {
//   id          String   @id @default(uuid())
//   name        String
//   config_json Json
//   createdAt   DateTime @default(now())

//   userId String
//   user   User @relation(fields: [userId], references: [id], onDelete: Cascade)

//   records Record[]
// }

interface AppStore {
    appData: [];
    setAppData: (app: []) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    appData: [],
    setAppData: (app) => set({ appData: app }),
}))