/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as functions_createUser from "../functions/createUser.js";
import type * as functions_loginUser from "../functions/loginUser.js";
import type * as functions_products from "../functions/products.js";
import type * as functions_seed from "../functions/seed.js";
import type * as functions_uploadImage from "../functions/uploadImage.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "functions/createUser": typeof functions_createUser;
  "functions/loginUser": typeof functions_loginUser;
  "functions/products": typeof functions_products;
  "functions/seed": typeof functions_seed;
  "functions/uploadImage": typeof functions_uploadImage;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
