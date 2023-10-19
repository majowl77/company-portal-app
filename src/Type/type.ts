export type Company = {
  login: string,
  id: number
  node_id: string,
  url: string,
  avatar_url:string,
  description:string,
}
export type CompanyOne = {
  login: string,
  id: number,
  url: string,
  repos_url: string,
  events_url: string,
  avatar_url: string,
  description: null,
  is_verified: boolean,
  followers: number,
  following: number,
  type: string,
}

