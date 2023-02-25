export const saveJwt = (response) => {
    localStorage.setItem('jwt', response.data.jwt)
}

export const getJwt = () => {
    const jwt = localStorage.getItem('twt')
    return jwt
}