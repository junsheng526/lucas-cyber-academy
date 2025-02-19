export interface Person {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  access: string;
  profileImage: string;
}

export interface Lecturer extends Person {
  // TODO: Lecturer details such as certification and course in charge
  assignedCourses: string[];
}

export interface Rating {
  id: string; // course id
  average: number;
  count: number;
}

export interface CourseCategory {
  id: string; // course id
  name: string;
}

export interface PriceType {
  amount: number;
  currency: string;
  discount?: number;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  featuredImage: string;
  href: string;
  category: string;
  price: number;
  duration: string;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags?: string[];
  galleryImgs: string[];
  isAds: boolean | null;
  createdAt: string;
  modifiedAt: string;
  saleOff?: string;

  lecturerId?: string;
}
