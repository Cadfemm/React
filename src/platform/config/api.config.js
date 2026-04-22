const BASE_API = 'https://backend.tps-ind.com/' + 'api/'

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

    // Forms apis
    FORM: BASE_API + 'form/',

    // Patients apis
    PATIENT: BASE_API + 'patient/',
}

export {
    API_URL,
    BASE_API
}