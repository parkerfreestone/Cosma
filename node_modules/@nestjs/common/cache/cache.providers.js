"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCacheManager = void 0;
const load_package_util_1 = require("../utils/load-package.util");
const cache_constants_1 = require("./cache.constants");
const cache_module_definition_1 = require("./cache.module-definition");
const default_options_1 = require("./default-options");
/**
 * Creates a CacheManager Provider.
 *
 * @publicApi
 */
function createCacheManager() {
    return {
        provide: cache_constants_1.CACHE_MANAGER,
        useFactory: (options) => {
            const cacheManager = (0, load_package_util_1.loadPackage)('cache-manager', 'CacheModule', () => require('cache-manager'));
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const cacheManagerVersion = require('cache-manager/package.json').version;
            const cacheManagerMajor = cacheManagerVersion.split('.')[0];
            const cachingFactory = (store, options) => {
                if (cacheManagerMajor < 5) {
                    return cacheManager.caching(Object.assign(Object.assign({}, default_options_1.defaultCacheOptions), Object.assign(Object.assign({}, options), { store })));
                }
                return cacheManager.caching(store !== null && store !== void 0 ? store : 'memory', Object.assign(Object.assign({}, default_options_1.defaultCacheOptions), options));
            };
            return Array.isArray(options)
                ? cacheManager.multiCaching(options.map(option => cachingFactory(options.store, option)))
                : cachingFactory(options.store, options);
        },
        inject: [cache_module_definition_1.MODULE_OPTIONS_TOKEN],
    };
}
exports.createCacheManager = createCacheManager;
