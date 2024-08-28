import ComponentView from '../component-view';

const createPointListTemplate = () => '<ul class="trip-events__list"></ul>';

class PointListView extends ComponentView {
  getTemplate() {
    return createPointListTemplate();
  }
}

export default PointListView;
