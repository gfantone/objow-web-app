import instance from '../instance'

const baseUrl = 'collaborator-badge-summaries/';

const collaboratorBadgeSummary = {
    detail(id) {
        const url = `${baseUrl}${id}/`
        return instance.get(url)
    }
}

export default collaboratorBadgeSummary
