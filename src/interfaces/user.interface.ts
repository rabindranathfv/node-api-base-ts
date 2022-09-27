export interface User {
  email: string
  username: string
  password: string
}

export interface UserAuth extends User {
  token: string
}