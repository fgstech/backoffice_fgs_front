import axios from 'axios';
import endpoint from '../Endpoint';
import jwt_decode from './jwt';

class AxiosService {
    accessTokenKey = 'atfgscomm';
    refreshTokenKey = 'rtfgscomm';
    idTokenKey = 'itfgscomm';
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.initializeInterceptors();
    }

    // Métodos para manejar los tokens
    getToken() {
        return localStorage.getItem(this.accessTokenKey); // Implementa tu lógica de almacenamiento
    }

    setToken(token) {
        localStorage.setItem(this.accessTokenKey, token);
    }

    getRefreshToken() {
        return localStorage.getItem(this.refreshTokenKey); // Implementa tu lógica de almacenamiento
    }

    setRefreshToken(refreshToken) {
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    getIdToken() {
        return localStorage.getItem(this.idTokenKey); // Implementa tu lógica de almacenamiento
    }

    setIdToken(idToken) {
        localStorage.setItem(this.idTokenKey, idToken);
    }

    closeSession() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        window.location.href = '/login';
    }

    async getPayload() {
        const token = this.getToken();
        const payload = jwt_decode(token);
        return payload;
    }

    async getPermissionRole() {
        const payload = await this.getPayload();
        const permissions = payload.permissions ? payload.permissions.permissions : payload.roles;
        const role = payload.permissions ? payload.permissions.name : "superadmin";
        return { role, permissions };
    }

    isAuthenticated() {
        const token = this.getToken();
        const refreshToken = this.getRefreshToken();

        if (!token) {
            if (refreshToken) {
                try {
                    // Intentar renovar el token de acceso
                    return this.refreshToken()
                        .then(() => true) // Renovación exitosa
                        .catch(() => false); // Error en la renovación
                } catch (error) {
                    console.error('Error al intentar renovar el token:', error);
                    return false; // Error al renovar
                }
            }
            return false; // No hay token ni refresh token
        }

        try {
            const decoded = jwt_decode(token); // Decodificar el access token
            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
            if (decoded.exp > currentTime) {
                return true; // Token aún es válido
            } else if (refreshToken) {
                // Si el token ha expirado pero hay un refresh token, intenta renovarlo
                return this.refreshToken()
                    .then(() => true) // Renovación exitosa
                    .catch(() => false); // Error en la renovación
            }
            return false; // Token expirado y sin refresh token
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return false; // Token no válido
        }
    }

    async refreshToken(token) {
        try {
            const payload = jwt_decode(token);
            const response = await axios.post(`${this.endpoint}/auth/refresh`, {
                refreshToken: this.getRefreshToken(),
                username: payload.username
            });

            this.setToken(response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            this.closeSession(); // Cierra la sesión si falla el refresh
            throw error;
        }
    }

    initializeInterceptors() {
        // Interceptor de solicitud
        axios.interceptors.request.use((config) => {
            const token = this.getToken();
            config.baseURL = this.endpoint;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            config.headers['Content-Type'] = 'application/json';
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // Interceptor de respuesta
        axios.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;

            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Evita bucles infinitos
                try {
                    const newAccessToken = await this.refreshToken();
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest); // Reintenta la solicitud
                } catch (err) {
                    return Promise.reject(err);
                }
            } else if (error.response && error.response.status === 403) {
                this.closeSession(); // Manejo de errores 403
            }

            return Promise.reject(error.response || error);
        });
    }
}

// Crear una instancia y configurar globalmente
export default new AxiosService(endpoint);