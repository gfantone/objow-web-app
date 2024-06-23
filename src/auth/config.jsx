export const config = {
    authority: 'http://localhost:8080/realms/edenred', // Remplacez par l'URL de votre serveur Keycloak et de votre realm
    automaticSilentRenew: true,
    client_id: 'edenred', // Remplacez par l'ID de votre client Keycloak
    redirect_uri: 'http://localhost:3000/callback', // Remplacez par l'URL de redirection après l'authentification
    response_type: 'code',
    scope: 'openid profile email', // Les scopes dont vous avez besoin
    loadUserInfo: true, // Charger les informations utilisateur
    monitorSession: true // Surveiller la session
};
