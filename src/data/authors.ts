import { users } from "./jsons/__users";
import { AuthorType } from "./types";
import avatar1 from "../assets/avatars/Image-1.png";
import avatar2 from "../assets/avatars/Image-2.png";
import avatar3 from "../assets/avatars/Image-3.png";
import avatar4 from "../assets/avatars/Image-4.png";
import avatar5 from "../assets/avatars/Image-5.png";
import avatar6 from "../assets/avatars/Image-6.png";
import avatar7 from "../assets/avatars/Image-7.png";
import avatar8 from "../assets/avatars/Image-8.png";
import avatar9 from "../assets/avatars/Image-9.png";
import avatar10 from "../assets/avatars/Image-10.png";
import avatar11 from "../assets/avatars/Image-11.png";
import avatar12 from "../assets/avatars/Image-12.png";
import avatar13 from "../assets/avatars/Image-13.png";
import avatar14 from "../assets/avatars/Image-14.png";
import avatar15 from "../assets/avatars/Image-15.png";
import avatar16 from "../assets/avatars/Image-16.png";
import avatar17 from "../assets/avatars/Image-17.png";
import avatar18 from "../assets/avatars/Image-18.png";
import avatar19 from "../assets/avatars/Image-19.png";
import avatar20 from "../assets/avatars/Image-20.png";

const imgs = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20,
];

const DEMO_AUTHORS: AuthorType[] = users.map((item, index) => ({
  ...item,
  avatar: imgs[index] || item.avatar,
  href: item.href,
}));

export { DEMO_AUTHORS };
