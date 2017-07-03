import * as Components from "js/Components";

export default class System {
  getEntitiesWithComponents(entities, ...components) {
    return entities.filter(entity => {
      return components.every(component => {
        return entity.getComponent(component);
      });
    });
  }
}
