export const config = {
    authority: process.env.REACT_APP_KEYCLOAK_URL, // Utilise l'URL de votre serveur Keycloak et de votre realm depuis l'environnement
    automaticSilentRenew: true,
    client_id: process.env.REACT_APP_CLIENT_ID, // Utilise l'ID de votre client Keycloak depuis l'environnement
    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`, // Utilise l'URL de redirection depuis l'environnement
    response_type: 'code',
    scope: 'openid profile email', // Les scopes dont vous avez besoin
    loadUserInfo: true, // Charger les informations utilisateur
    monitorSession: true // Surveiller la session
};
