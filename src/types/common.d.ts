interface MemberEmail {
  email: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  nickname: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  error?: string;
}
