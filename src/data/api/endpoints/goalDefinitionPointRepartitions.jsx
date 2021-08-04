import instance from '../instance'

const baseUrl = 'goal-definition-point-repartitions/';

const goalDefinitionPointRepartitions = {
    list() {
        return instance.get(baseUrl)
    },
    update(pointRepartition) {
      console.log(pointRepartition);
      const url = `${baseUrl}${pointRepartition.id}/`;
      return instance.put(url, pointRepartition)
    },
};

export default goalDefinitionPointRepartitions
