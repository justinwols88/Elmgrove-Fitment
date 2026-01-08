import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CompatibleFitment_Key {
  vehicleId: UUIDString;
  tireId: UUIDString;
  wheelId: UUIDString;
  fitmentType: string;
  __typename?: 'CompatibleFitment_Key';
}

export interface CreateCompatibleFitmentData {
  compatibleFitment_insert: CompatibleFitment_Key;
}

export interface CreateCompatibleFitmentVariables {
  vehicleId: UUIDString;
  tireId: UUIDString;
  wheelId: UUIDString;
  fitmentType: string;
  notes?: string | null;
}

export interface CreateTirePurchaseData {
  tirePurchase_insert: TirePurchase_Key;
}

export interface CreateTirePurchaseVariables {
  tireId: UUIDString;
  userVehicleId: UUIDString;
  mileageAtPurchase?: number | null;
  price: number;
  purchaseDate: DateString;
  supplier?: string | null;
}

export interface GetUserVehiclesData {
  userVehicles: ({
    id: UUIDString;
    nickname: string;
    vehicle: {
      make: string;
      model: string;
      year: number;
    };
  } & UserVehicle_Key)[];
}

export interface GetUserVehiclesVariables {
  userId: UUIDString;
}

export interface ListVehiclesData {
  vehicles: ({
    id: UUIDString;
    make: string;
    model: string;
    year: number;
  } & Vehicle_Key)[];
}

export interface TirePurchase_Key {
  id: UUIDString;
  __typename?: 'TirePurchase_Key';
}

export interface Tire_Key {
  id: UUIDString;
  __typename?: 'Tire_Key';
}

export interface UserVehicle_Key {
  id: UUIDString;
  __typename?: 'UserVehicle_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Vehicle_Key {
  id: UUIDString;
  __typename?: 'Vehicle_Key';
}

export interface Wheel_Key {
  id: UUIDString;
  __typename?: 'Wheel_Key';
}

interface CreateTirePurchaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTirePurchaseVariables): MutationRef<CreateTirePurchaseData, CreateTirePurchaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTirePurchaseVariables): MutationRef<CreateTirePurchaseData, CreateTirePurchaseVariables>;
  operationName: string;
}
export const createTirePurchaseRef: CreateTirePurchaseRef;

export function createTirePurchase(vars: CreateTirePurchaseVariables): MutationPromise<CreateTirePurchaseData, CreateTirePurchaseVariables>;
export function createTirePurchase(dc: DataConnect, vars: CreateTirePurchaseVariables): MutationPromise<CreateTirePurchaseData, CreateTirePurchaseVariables>;

interface ListVehiclesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVehiclesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListVehiclesData, undefined>;
  operationName: string;
}
export const listVehiclesRef: ListVehiclesRef;

export function listVehicles(): QueryPromise<ListVehiclesData, undefined>;
export function listVehicles(dc: DataConnect): QueryPromise<ListVehiclesData, undefined>;

interface GetUserVehiclesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVehiclesVariables): QueryRef<GetUserVehiclesData, GetUserVehiclesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVehiclesVariables): QueryRef<GetUserVehiclesData, GetUserVehiclesVariables>;
  operationName: string;
}
export const getUserVehiclesRef: GetUserVehiclesRef;

export function getUserVehicles(vars: GetUserVehiclesVariables): QueryPromise<GetUserVehiclesData, GetUserVehiclesVariables>;
export function getUserVehicles(dc: DataConnect, vars: GetUserVehiclesVariables): QueryPromise<GetUserVehiclesData, GetUserVehiclesVariables>;

interface CreateCompatibleFitmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCompatibleFitmentVariables): MutationRef<CreateCompatibleFitmentData, CreateCompatibleFitmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCompatibleFitmentVariables): MutationRef<CreateCompatibleFitmentData, CreateCompatibleFitmentVariables>;
  operationName: string;
}
export const createCompatibleFitmentRef: CreateCompatibleFitmentRef;

export function createCompatibleFitment(vars: CreateCompatibleFitmentVariables): MutationPromise<CreateCompatibleFitmentData, CreateCompatibleFitmentVariables>;
export function createCompatibleFitment(dc: DataConnect, vars: CreateCompatibleFitmentVariables): MutationPromise<CreateCompatibleFitmentData, CreateCompatibleFitmentVariables>;

