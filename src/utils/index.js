const TOKEN_KEY = 'SIGESPRED_TOKEN';
export const USUARIO = 'USUARIO';
export const USUARIO_ID = 'IDUSUARIO';
export const PROYECTO_GESTION_PREDIAL = 'PROYECTO_GESTION_PREDIAL';

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


export const selectProyecto = (proyecto) => {
    console.log(proyecto)
    localStorage.setItem(PROYECTO_GESTION_PREDIAL, JSON.stringify(proyecto));
}

export const getselectProyecto = () => {
    return JSON.parse(localStorage.getItem(PROYECTO_GESTION_PREDIAL))
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