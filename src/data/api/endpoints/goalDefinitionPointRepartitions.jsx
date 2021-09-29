import instance from '../instance'

const baseUrl = 'goal-definition-point-repartitions/';

const goalDefinitionPointRepartitions = {
    list(definition) {
        let url = baseUrl;
        if(definition){
          url = `${url}?definition_id=${definition}`
        }
        return instance.get(baseUrl)
    },
    update(pointRepartition) {
      const url = `${baseUrl}${pointRepartition.id}/`;
      return instance.put(url, pointRepartition)
    },
};

export default goalDefinitionPointRepartitions
