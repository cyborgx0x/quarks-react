export interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Template[] | Target[] | Scan[] | ScanProfile[];
}

export interface Target {
  id: number;
  url: string;
  last_scan: string;
  org: string;
  created_at: string;
  modified_at: string;
}

export interface Scan {
  id: number;
  profile: ScanProfile;
  targets: Target[];
  scan_at: string;
  result: TemplateInfo[];
  created_at: string;
  modified_at: string;
  status: number;
  log: string;
}

export interface ScanProfile {
  id: number;
  name: string;
  desc: string;
  filter: object;
  output: object;
  configuration: {
    follow_redirects?: string;
  };
  created_at: string;
  modified_at: string;
  option: object | null;
}

export interface Template {
  id: number;
  name: string;
  author: string;
  tag: string;
  desc: string;
  severity: string;
  templateData: string | undefined;
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

export interface AxiosConfig {
  method: string;
  maxBodyLength: number;
  url: string;
  headers: {
    Authorization: string;
  };
}

type Info = {
  name: string;
  author: string;
  severity: string;
  description: string;
  remediation: string;
  reference: string[];
  classification: {
    "cvss-metrics": string;
    "cvss-score": number;
    "cve-id": string;
    "cwe-id": string;
    "epss-score": number;
    "epss-percentile": number;
    cpe: string;
  };
  metadata: {
    verified: boolean;
    "max-request": number;
    "shodan-query": string;
    "fofa-query": string;
    vendor: string;
    product: string;
  };
  tags: string[];
};

type Http = {
  raw: string[];
  matchers: {
    type: string;
    dsl: string[];
    condition: string;
  }[];
};

export type TemplateData = {
  id: string;
  info: Info;
  http: Http[];
};

export interface ReportPeople {
  name: string;
  position: string;
  email: string;
}

export interface Scope {
  type: string;
  target: string;
}

export type TemplateInfo = {
  template: string;
  "template-url": string;
  "template-id": string;
  "template-path": string;
  info: {
    name: string;
    author: string[];
    tags: string[];
    description: string;
    reference?: string[];
    severity: string;
    metadata: {
      "max-request"?: string;
    };
    remediation?: string;
    classification: {
      "cve-id"?: string[];
      "cwe-id"?: string[];
    };
  };
  type: string;
  host: string;
  "matched-at": string;
  "extracted-results"?: string[];
  request: string;
  response: string;
  timestamp: string;
  "matcher-status": string;
};
