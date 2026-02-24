export type SectionProps = {
  title: string;
  content: string;
};

export interface NavbarLink {
  label: string;
  href: string;
}

export type Service = {
  id: number;
  title: string;
  description: string;
};

export type BlogPost = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export type ContactInfo = {
  name: string;
  email: string;
  message: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};