export interface TemplateResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Template[];
}

export interface Template {
  id: number;
  name: string;
  author: string;
  tag: string;
  severity: string;
  created_at: string;
  modified_at: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}



