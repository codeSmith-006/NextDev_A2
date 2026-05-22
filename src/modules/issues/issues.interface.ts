// title, description, type, status

export interface IIssues {
  title: string;
  description: string;
  type: string;
  status?: "open" | "in_progress" | "resolved";
}
