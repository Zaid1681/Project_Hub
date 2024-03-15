import PropTypes from 'prop-types';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store';

const PersistProvider = ({ children }) => {
  return <PersistGate persistor={persistor}>{children}</PersistGate>;
};

PersistProvider.propTypes = {
  children: PropTypes.node.isRequired,as
};

export default PersistProvider;
