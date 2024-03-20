import { Timestamp } from "firebase/firestore";

export interface Comment {
  createdAt: Timestamp;
  userId: string | undefined;
  name: string | null | undefined;
  body: string;
}
