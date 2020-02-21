import instance from '../instance'

const baseUrl = 'current-collaborator-badges/';

const currentCollaboratorBadges = {
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
};

export default currentCollaboratorBadges