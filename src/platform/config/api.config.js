const BASE_API = (process.env.REACT_APP_API_DJANGO || 'http://127.0.0.1:8000') + '/api/'

const API_URL = {
    // Users apis
    USER: BASE_API + 'user/',
    ME: BASE_API + 'user/me/',
    LOGIN: BASE_API + 'user/login/',
    LOGOUT: BASE_API + 'user/logout/',

    // Tokens apis
    TOKEN: BASE_API + 'token/',
    VERIFY: BASE_API + 'token/verify/',
    REFRESH: BASE_API + 'token/refresh/',

    // Assessment apis
    ASSESSMENT: BASE_API + 'assessment/',

    // Patients apis
    PATIENT: BASE_API + 'patient/',
}

export {
    API_URL,
    BASE_API
}