const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/v1";

export const USER_BACKEND_URL = BACKEND_URL + "/users";

export const SOURCE_BACKEND_URL = BACKEND_URL + "/sources";

export const EXPENSES_BACKEND_URL = BACKEND_URL + "/expenses";

export const EXPIRY_TIME_ACCESS_TOKEN = 5 * 60 * 1000;

export const EXPIRY_TIME_REFRESH_TOKEN = 31556952000;

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;