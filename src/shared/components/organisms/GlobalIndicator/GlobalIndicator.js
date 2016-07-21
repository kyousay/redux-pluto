import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import Indicator from '../../atoms/Indicator';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    loading: PropTypes.bool.isRequired,
  }),
)(class GlobalIndicator extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div>
        <Indicator loading={loading} />
      </div>
    );
  }
});