export const LOGIN_ROUTE = 'Signin'
export const REGISTER_ROUTE = 'Signup'
export const FORGOT_PASSWORD_ROUTE = 'ForgotPassword'
export const HOME_ROUTE = 'Home'
export const ACCOUNT_ROUTE = 'Account'
export const POST_ROUTE = 'Post'
export const LINKS_ROUTE = 'Links'

// AsyncStorage
export const AUTH_STORAGE = '@auth'

// Slice Status
export const GENERATE_STATUS = (name = '') => ({
  IDLE: 'idle',
  LOADING: `loading-${name}`,
  SUCCEEDED: `succeeded-${name}`,
  FAILED: `failed-${name}`,
})
