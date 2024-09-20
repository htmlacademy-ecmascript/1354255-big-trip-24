import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class MessageView extends AbstractView {
  #message;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createTemplate(this.#message);
  }
}

export default MessageView;
