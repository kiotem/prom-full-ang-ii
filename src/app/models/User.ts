import Project from "./Project";

export default interface User
{
  objectId: string;
  pmsId: string;
  email: string;
  name: string;
  role: string;
  projects: Project[];
  sessionToken: string;
}