import { createElement } from '@/render';

class ComponentView {
  _createTemplate;
  _name = 'ComponentView';

  constructor({ props }) {
    this.props = props;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  get template() {
    if (!this._createTemplate) {
      throw new Error(`Нужно добавить темлейт для компонента ${this._name}`);
    }

    return this._createTemplate(this.props);
  }
}

export default ComponentView;
