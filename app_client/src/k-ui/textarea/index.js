import KTextarea from './textarea';

/* istanbul ignore next */
KTextarea.install = function(Vue) {
  Vue.component(KTextarea.name, KTextarea);
};

export default KTextarea;
