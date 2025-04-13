// ... existing code ...
export type TUser = {
  id: string;
  email: string;
  name: string;
  sex: string;
  age: number;
  job: string;
  level: number;
  exp: number;
  characterCount: number;
};

export type TLoginResponse = {
  userId: string;
  email: string;
  name: string;
  accessToken: string;
  tokenType: string;
};

// ... existing code ...
