import instance from '../instance'

const baseUrl = 'user-goals/';

const userGoals = {
    list(inProgress, team, category, date) {
        const ordering = inProgress ? '-timer' : 'timer';
        const progress = inProgress ? 'True' : 'False';
        var url = `${baseUrl}?in_progress=${progress}&ordering=${ordering}`;
        if(team != null) url = `${url}&team=${team}`;
        if(category != null) url = `${url}&category=${category}`;
        if(date != null) url = `${url}&date=${date.toISOString()}`;
        return instance.get(url)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    ranking(id) {
        const url = `${baseUrl}${id}/ranking/`;
        return instance.get(url)
    },
    indications(id) {
        const url = `${baseUrl}${id}/indications/`;
        return instance.get(url)
    },
    playerGoals(id) {
        const url = `${baseUrl}${id}/player-goals/`;
        return instance.get(url)
    }
};

export default userGoals