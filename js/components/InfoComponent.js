export default class InfoComponent {
    constructor(args) {
        Object.entries(args).forEach((entry) => {
            this[entry[0]] = entry[1];
        });
    }
}
