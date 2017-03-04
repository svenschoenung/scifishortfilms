import { Children, Component, PropTypes } from 'react';

export default class ManifestProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.manifest = props.manifest;
  }

  getChildContext() {
    return { manifest: this.manifest };
  }

  render() {
    return Children.only(this.props.children);
  }
}

ManifestProvider.propTypes = {
  manifest: PropTypes.func.isRequired
}
ManifestProvider.childContextTypes = {
  manifest: PropTypes.func.isRequired
};
