import { Children, Component, PropTypes } from 'react';

export default class ManifestProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.manifest = props.manifest;
    this.insertCss = props.insertCss;
  }

  getChildContext() {
    return { manifest: this.manifest, insertCss: this.insertCss };
  }

  render() {
    return Children.only(this.props.children);
  }
}

ManifestProvider.propTypes = {
  manifest: PropTypes.func.isRequired,
  insertCss: PropTypes.func.isRequired
};
ManifestProvider.childContextTypes = {
  manifest: PropTypes.func.isRequired,
  insertCss: PropTypes.func.isRequired
};