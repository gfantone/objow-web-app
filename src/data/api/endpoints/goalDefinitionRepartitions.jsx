import instance from '../instance'

const baseUrl = 'goal-definition-repartitions/';

const goalDefinitionRepartitions = {
    list() {
        return instance.get(baseUrl)
    },
};

export default goalDefinitionRepartitions
