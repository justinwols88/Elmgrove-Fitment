# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createTirePurchase, listVehicles, getUserVehicles, createCompatibleFitment } from '@dataconnect/generated';


// Operation CreateTirePurchase:  For variables, look at type CreateTirePurchaseVars in ../index.d.ts
const { data } = await CreateTirePurchase(dataConnect, createTirePurchaseVars);

// Operation ListVehicles: 
const { data } = await ListVehicles(dataConnect);

// Operation GetUserVehicles:  For variables, look at type GetUserVehiclesVars in ../index.d.ts
const { data } = await GetUserVehicles(dataConnect, getUserVehiclesVars);

// Operation CreateCompatibleFitment:  For variables, look at type CreateCompatibleFitmentVars in ../index.d.ts
const { data } = await CreateCompatibleFitment(dataConnect, createCompatibleFitmentVars);


```