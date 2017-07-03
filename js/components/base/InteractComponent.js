export default class InteractComponent {
    interact(thisEntity, otherEntity, allEntities) {
        throw Error('This is the base method of the interact component, Please implement interct() if you extend this class');
    }
}
