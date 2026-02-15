export interface NavLink {
  label: string;
  href: string;
}

export interface Comment {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  icon: string; // 图标组件名称，用于动态导入
  gradient: string;
  tags: string[];
  status: string;
}

export interface FormData {
  name: string;
  email: string;
  content: string;
}
