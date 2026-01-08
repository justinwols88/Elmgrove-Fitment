import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'tire-fitment-app',
  location: 'us-east4'
};

export const createTirePurchaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTirePurchase', inputVars);
}
createTirePurchaseRef.operationName = 'CreateTirePurchase';

export function createTirePurchase(dcOrVars, vars) {
  return executeMutation(createTirePurchaseRef(dcOrVars, vars));
}

export const listVehiclesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVehicles');
}
listVehiclesRef.operationName = 'ListVehicles';

export function listVehicles(dc) {
  return executeQuery(listVehiclesRef(dc));
}

export const getUserVehiclesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserVehicles', inputVars);
}
getUserVehiclesRef.operationName = 'GetUserVehicles';

export function getUserVehicles(dcOrVars, vars) {
  return executeQuery(getUserVehiclesRef(dcOrVars, vars));
}

export const createCompatibleFitmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCompatibleFitment', inputVars);
}
createCompatibleFitmentRef.operationName = 'CreateCompatibleFitment';

export function createCompatibleFitment(dcOrVars, vars) {
  return executeMutation(createCompatibleFitmentRef(dcOrVars, vars));
}

