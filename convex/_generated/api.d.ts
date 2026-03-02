/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as constants from "../constants.js";
import type * as functions_createUser from "../functions/createUser.js";
import type * as functions_loginUser from "../functions/loginUser.js";
import type * as functions_metadata_migration from "../functions/metadata_migration.js";
import type * as functions_products from "../functions/products.js";
import type * as functions_seed from "../functions/seed.js";
import type * as functions_updateProductAssets from "../functions/updateProductAssets.js";
import type * as productData from "../productData.js";
import type * as translations from "../translations.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  constants: typeof constants;
  "functions/createUser": typeof functions_createUser;
  "functions/loginUser": typeof functions_loginUser;
  "functions/metadata_migration": typeof functions_metadata_migration;
  "functions/products": typeof functions_products;
  "functions/seed": typeof functions_seed;
  "functions/updateProductAssets": typeof functions_updateProductAssets;
  productData: typeof productData;
  translations: typeof translations;
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
