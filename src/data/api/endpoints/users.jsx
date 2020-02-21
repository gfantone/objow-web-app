import instance from '../instance'

const baseUrl = 'users/';

const users = {
    list(isActive) {
        const url = `${baseUrl}?isActive=${isActive}`;
        return instance.get(url)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    create(user) {
        user.isActive = true;
        return instance.post(baseUrl, user)
    },
    update(user) {
        const url = `${baseUrl}${user.id}/`;
        return instance.patch(url, {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            team: user.team
        })
    },
    updateActivation(id, isActive) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { isActive })
    },
    updatePassword(id, password) {
        const url = `${baseUrl}${id}/password/`;
        return instance.post(url, { password })
    },
    updateTeam(id, team) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { team })
    },
    saveConnection() {
        const url = `${baseUrl}save-connection/`;
        return instance.post(url)
    }
};

export default users
