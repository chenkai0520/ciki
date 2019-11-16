import Kextarea from './textarea'

const components = [
    Kextarea,
]
const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$KUI = {
        size: opts.size || '',
        zIndex: opts.zIndex || 2000
    };
}
export default {
    version: '0.0.1',
    install,
    Kextarea,
}