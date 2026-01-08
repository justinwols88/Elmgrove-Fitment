const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'tire-fitment-app',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createTirePurchaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTirePurchase', inputVars);
}
createTirePurchaseRef.operationName = 'CreateTirePurchase';
exports.createTirePurchaseRef = createTirePurchaseRef;

exports.createTirePurchase = function createTirePurchase(dcOrVars, vars) {
  return executeMutation(createTirePurchaseRef(dcOrVars, vars));
};

const listVehiclesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVehicles');
}
listVehiclesRef.operationName = 'ListVehicles';
exports.listVehiclesRef = listVehiclesRef;

exports.listVehicles = function listVehicles(dc) {
  return executeQuery(listVehiclesRef(dc));
};

const getUserVehiclesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserVehicles', inputVars);
}
getUserVehiclesRef.operationName = 'GetUserVehicles';
exports.getUserVehiclesRef = getUserVehiclesRef;

exports.getUserVehicles = function getUserVehicles(dcOrVars, vars) {
  return executeQuery(getUserVehiclesRef(dcOrVars, vars));
};

const createCompatibleFitmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCompatibleFitment', inputVars);
}
createCompatibleFitmentRef.operationName = 'CreateCompatibleFitment';
exports.createCompatibleFitmentRef = createCompatibleFitmentRef;

exports.createCompatibleFitment = function createCompatibleFitment(dcOrVars, vars) {
  return executeMutation(createCompatibleFitmentRef(dcOrVars, vars));
};
