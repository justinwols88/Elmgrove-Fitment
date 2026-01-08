# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListVehicles*](#listvehicles)
  - [*GetUserVehicles*](#getuservehicles)
- [**Mutations**](#mutations)
  - [*CreateTirePurchase*](#createtirepurchase)
  - [*CreateCompatibleFitment*](#createcompatiblefitment)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListVehicles
You can execute the `ListVehicles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVehicles(): QueryPromise<ListVehiclesData, undefined>;

interface ListVehiclesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVehiclesData, undefined>;
}
export const listVehiclesRef: ListVehiclesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVehicles(dc: DataConnect): QueryPromise<ListVehiclesData, undefined>;

interface ListVehiclesRef {
  ...
  (dc: DataConnect): QueryRef<ListVehiclesData, undefined>;
}
export const listVehiclesRef: ListVehiclesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVehiclesRef:
```typescript
const name = listVehiclesRef.operationName;
console.log(name);
```

### Variables
The `ListVehicles` query has no variables.
### Return Type
Recall that executing the `ListVehicles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVehiclesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListVehiclesData {
  vehicles: ({
    id: UUIDString;
    make: string;
    model: string;
    year: number;
  } & Vehicle_Key)[];
}
```
### Using `ListVehicles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVehicles } from '@dataconnect/generated';


// Call the `listVehicles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVehicles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVehicles(dataConnect);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
listVehicles().then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

### Using `ListVehicles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVehiclesRef } from '@dataconnect/generated';


// Call the `listVehiclesRef()` function to get a reference to the query.
const ref = listVehiclesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVehiclesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

## GetUserVehicles
You can execute the `GetUserVehicles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserVehicles(vars: GetUserVehiclesVariables): QueryPromise<GetUserVehiclesData, GetUserVehiclesVariables>;

interface GetUserVehiclesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVehiclesVariables): QueryRef<GetUserVehiclesData, GetUserVehiclesVariables>;
}
export const getUserVehiclesRef: GetUserVehiclesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserVehicles(dc: DataConnect, vars: GetUserVehiclesVariables): QueryPromise<GetUserVehiclesData, GetUserVehiclesVariables>;

interface GetUserVehiclesRef {
  ...
  (dc: DataConnect, vars: GetUserVehiclesVariables): QueryRef<GetUserVehiclesData, GetUserVehiclesVariables>;
}
export const getUserVehiclesRef: GetUserVehiclesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserVehiclesRef:
```typescript
const name = getUserVehiclesRef.operationName;
console.log(name);
```

### Variables
The `GetUserVehicles` query requires an argument of type `GetUserVehiclesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserVehiclesVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserVehicles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserVehiclesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserVehicles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserVehicles, GetUserVehiclesVariables } from '@dataconnect/generated';

// The `GetUserVehicles` query requires an argument of type `GetUserVehiclesVariables`:
const getUserVehiclesVars: GetUserVehiclesVariables = {
  userId: ..., 
};

// Call the `getUserVehicles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserVehicles(getUserVehiclesVars);
// Variables can be defined inline as well.
const { data } = await getUserVehicles({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserVehicles(dataConnect, getUserVehiclesVars);

console.log(data.userVehicles);

// Or, you can use the `Promise` API.
getUserVehicles(getUserVehiclesVars).then((response) => {
  const data = response.data;
  console.log(data.userVehicles);
});
```

### Using `GetUserVehicles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserVehiclesRef, GetUserVehiclesVariables } from '@dataconnect/generated';

// The `GetUserVehicles` query requires an argument of type `GetUserVehiclesVariables`:
const getUserVehiclesVars: GetUserVehiclesVariables = {
  userId: ..., 
};

// Call the `getUserVehiclesRef()` function to get a reference to the query.
const ref = getUserVehiclesRef(getUserVehiclesVars);
// Variables can be defined inline as well.
const ref = getUserVehiclesRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserVehiclesRef(dataConnect, getUserVehiclesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userVehicles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userVehicles);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateTirePurchase
You can execute the `CreateTirePurchase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTirePurchase(vars: CreateTirePurchaseVariables): MutationPromise<CreateTirePurchaseData, CreateTirePurchaseVariables>;

interface CreateTirePurchaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTirePurchaseVariables): MutationRef<CreateTirePurchaseData, CreateTirePurchaseVariables>;
}
export const createTirePurchaseRef: CreateTirePurchaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTirePurchase(dc: DataConnect, vars: CreateTirePurchaseVariables): MutationPromise<CreateTirePurchaseData, CreateTirePurchaseVariables>;

interface CreateTirePurchaseRef {
  ...
  (dc: DataConnect, vars: CreateTirePurchaseVariables): MutationRef<CreateTirePurchaseData, CreateTirePurchaseVariables>;
}
export const createTirePurchaseRef: CreateTirePurchaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTirePurchaseRef:
```typescript
const name = createTirePurchaseRef.operationName;
console.log(name);
```

### Variables
The `CreateTirePurchase` mutation requires an argument of type `CreateTirePurchaseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTirePurchaseVariables {
  tireId: UUIDString;
  userVehicleId: UUIDString;
  mileageAtPurchase?: number | null;
  price: number;
  purchaseDate: DateString;
  supplier?: string | null;
}
```
### Return Type
Recall that executing the `CreateTirePurchase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTirePurchaseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTirePurchaseData {
  tirePurchase_insert: TirePurchase_Key;
}
```
### Using `CreateTirePurchase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTirePurchase, CreateTirePurchaseVariables } from '@dataconnect/generated';

// The `CreateTirePurchase` mutation requires an argument of type `CreateTirePurchaseVariables`:
const createTirePurchaseVars: CreateTirePurchaseVariables = {
  tireId: ..., 
  userVehicleId: ..., 
  mileageAtPurchase: ..., // optional
  price: ..., 
  purchaseDate: ..., 
  supplier: ..., // optional
};

// Call the `createTirePurchase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTirePurchase(createTirePurchaseVars);
// Variables can be defined inline as well.
const { data } = await createTirePurchase({ tireId: ..., userVehicleId: ..., mileageAtPurchase: ..., price: ..., purchaseDate: ..., supplier: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTirePurchase(dataConnect, createTirePurchaseVars);

console.log(data.tirePurchase_insert);

// Or, you can use the `Promise` API.
createTirePurchase(createTirePurchaseVars).then((response) => {
  const data = response.data;
  console.log(data.tirePurchase_insert);
});
```

### Using `CreateTirePurchase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTirePurchaseRef, CreateTirePurchaseVariables } from '@dataconnect/generated';

// The `CreateTirePurchase` mutation requires an argument of type `CreateTirePurchaseVariables`:
const createTirePurchaseVars: CreateTirePurchaseVariables = {
  tireId: ..., 
  userVehicleId: ..., 
  mileageAtPurchase: ..., // optional
  price: ..., 
  purchaseDate: ..., 
  supplier: ..., // optional
};

// Call the `createTirePurchaseRef()` function to get a reference to the mutation.
const ref = createTirePurchaseRef(createTirePurchaseVars);
// Variables can be defined inline as well.
const ref = createTirePurchaseRef({ tireId: ..., userVehicleId: ..., mileageAtPurchase: ..., price: ..., purchaseDate: ..., supplier: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTirePurchaseRef(dataConnect, createTirePurchaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tirePurchase_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tirePurchase_insert);
});
```

## CreateCompatibleFitment
You can execute the `CreateCompatibleFitment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCompatibleFitment(vars: CreateCompatibleFitmentVariables): MutationPromise<CreateCompatibleFitmentData, CreateCompatibleFitmentVariables>;

interface CreateCompatibleFitmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCompatibleFitmentVariables): MutationRef<CreateCompatibleFitmentData, CreateCompatibleFitmentVariables>;
}
export const createCompatibleFitmentRef: CreateCompatibleFitmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCompatibleFitment(dc: DataConnect, vars: CreateCompatibleFitmentVariables): MutationPromise<CreateCompatibleFitmentData, CreateCompatibleFitmentVariables>;

interface CreateCompatibleFitmentRef {
  ...
  (dc: DataConnect, vars: CreateCompatibleFitmentVariables): MutationRef<CreateCompatibleFitmentData, CreateCompatibleFitmentVariables>;
}
export const createCompatibleFitmentRef: CreateCompatibleFitmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCompatibleFitmentRef:
```typescript
const name = createCompatibleFitmentRef.operationName;
console.log(name);
```

### Variables
The `CreateCompatibleFitment` mutation requires an argument of type `CreateCompatibleFitmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCompatibleFitmentVariables {
  vehicleId: UUIDString;
  tireId: UUIDString;
  wheelId: UUIDString;
  fitmentType: string;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `CreateCompatibleFitment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCompatibleFitmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCompatibleFitmentData {
  compatibleFitment_insert: CompatibleFitment_Key;
}
```
### Using `CreateCompatibleFitment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCompatibleFitment, CreateCompatibleFitmentVariables } from '@dataconnect/generated';

// The `CreateCompatibleFitment` mutation requires an argument of type `CreateCompatibleFitmentVariables`:
const createCompatibleFitmentVars: CreateCompatibleFitmentVariables = {
  vehicleId: ..., 
  tireId: ..., 
  wheelId: ..., 
  fitmentType: ..., 
  notes: ..., // optional
};

// Call the `createCompatibleFitment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCompatibleFitment(createCompatibleFitmentVars);
// Variables can be defined inline as well.
const { data } = await createCompatibleFitment({ vehicleId: ..., tireId: ..., wheelId: ..., fitmentType: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCompatibleFitment(dataConnect, createCompatibleFitmentVars);

console.log(data.compatibleFitment_insert);

// Or, you can use the `Promise` API.
createCompatibleFitment(createCompatibleFitmentVars).then((response) => {
  const data = response.data;
  console.log(data.compatibleFitment_insert);
});
```

### Using `CreateCompatibleFitment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCompatibleFitmentRef, CreateCompatibleFitmentVariables } from '@dataconnect/generated';

// The `CreateCompatibleFitment` mutation requires an argument of type `CreateCompatibleFitmentVariables`:
const createCompatibleFitmentVars: CreateCompatibleFitmentVariables = {
  vehicleId: ..., 
  tireId: ..., 
  wheelId: ..., 
  fitmentType: ..., 
  notes: ..., // optional
};

// Call the `createCompatibleFitmentRef()` function to get a reference to the mutation.
const ref = createCompatibleFitmentRef(createCompatibleFitmentVars);
// Variables can be defined inline as well.
const ref = createCompatibleFitmentRef({ vehicleId: ..., tireId: ..., wheelId: ..., fitmentType: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCompatibleFitmentRef(dataConnect, createCompatibleFitmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.compatibleFitment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.compatibleFitment_insert);
});
```

