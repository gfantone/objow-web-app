import instance from '../instance'

const baseUrl = 'next-collaborator-badges/';

const nextCollaboratorBadges = {
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
};

export default nextCollaboratorBadges