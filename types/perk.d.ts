type PerkRating = {
  rating: string | number;
  level: string;
};
type Experience = {
  company: string;
  role: string;
  start: Date | string;
  end: Date | string;
  place: string;
  description: string[];
  skills: string[];
  link: string;
};
type Testimonial = {
  review: string;
  name: string;
  role: string;
  avatar: string;
};
type Skill = {
  name: string;
  icon: JSX.Element;
};
type Education = {
  id: string;
  course: string;
  institution: string;
  place?: string;
  grade?: string;
  description?: string[];
  start: string;
  end: string;
  skills?: string[];
  type?: string;
  url?: string;
};

type Rating = {
  username: string;
  rating: number;
  level: string;
};
type PerkRating = {
  rating: string | number;
  level: string;
};