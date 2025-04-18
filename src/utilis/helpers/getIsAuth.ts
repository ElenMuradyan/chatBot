export async function getIsAuth() {
    const response = await fetch('/api', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { uid, isAuth } = await response.json();

    return { uid, isAuth};
}