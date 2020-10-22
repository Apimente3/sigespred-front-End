const TOKEN_KEY = 'SIGESPRED_TOKEN';
export const USUARIO = 'USUARIO';
export const USUARIO_ID = 'IDUSUARIO';

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export const login = ({token, usuario }) => {

    if(!token || !usuario){
        return null
    }
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USUARIO, JSON.stringify(usuario))
    localStorage.setItem(USUARIO_ID, usuario.id)
    return true;
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO);
}

export const getUsuario = () => {
    return JSON.parse(localStorage.getItem(USUARIO))
}


export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}