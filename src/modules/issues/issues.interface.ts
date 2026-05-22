// title, description, type, status

export interface IIssues {
  title: string;
  description: string;
  type: string;
  status?: "open" | "in_progress" | "resolved";
}

// reporter
interface IReporter {
  id: number;
  name: string;
  role: "contributor" | "maintainer";
}

export interface IIssueReporter {
  id: number;
  title: string;
  description: string;
  type: string;
  status: "open" | "in_progress" | "resolved";
  reporter: IReporter;
  created_at: Date;
  updated_at: Date;
}
