export interface UserProfile {
  access_token: string;
  refresh_token: string;
  user: UserDetails;
}


export interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
}