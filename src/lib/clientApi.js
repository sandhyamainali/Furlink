// Payment client helper removed.
// Previous functionality (initiatePayment, simulateCallback, getTransaction, renderAndSubmitEsewaForm)
// has been intentionally removed from the client bundle. These stubs exist so imports
// from older code paths do not crash the application during a transitional period.

function notAvailable(fnName) {
  return async function () {
    throw new Error(`${fnName} is not available: payment functionality has been removed.`);
  };
}

export const initiatePayment = notAvailable('initiatePayment');
export const simulateCallback = notAvailable('simulateCallback');
export const getTransaction = notAvailable('getTransaction');
export const renderAndSubmitEsewaForm = function () {
  throw new Error('renderAndSubmitEsewaForm is not available: payment functionality has been removed.');
};

export default { initiatePayment, simulateCallback, getTransaction, renderAndSubmitEsewaForm };