import instance from '../instance';

const baseUrl = 'goal-definition-point-repartition-modes/';

const goalDefinitionPointRepartitionModes = {
  list() {
    return instance.get(baseUrl);
  },
};

export default goalDefinitionPointRepartitionModes;
