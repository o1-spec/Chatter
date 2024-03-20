import { Timestamp } from "firebase/firestore";

export interface TrendingInterface {
  push: never;
  map(arg0: (blog: never) => void): unknown;
  id: string;
  author: string;
  category: string;
  createdAt: Timestamp;
  timestamp: Date;
  description: string;
  icon: string;
  imageUrl: string;
  likes: string[];
  comments: [];
  views: number;
  view: [];
  userId: string;
  title: string;
  uid: string;
  imgUrl: string;
}
