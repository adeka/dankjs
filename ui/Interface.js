import { observable } from 'mobx';

export default class Interface {
    @observable static store = {
        items: [],
        equipment: {},
        useIndicator: {}
    };
}
