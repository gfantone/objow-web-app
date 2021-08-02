import instance from '../instance'

const baseUrl = 'goal-definition-point-repartitions/';

const goalDefinitionPointRepartitions = {
    list() {
        return instance.get(baseUrl)
    },
};

export default goalDefinitionPointRepartitions
