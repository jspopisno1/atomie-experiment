/**
 * @file Atomie for the nodejs side
 * @author Liang
 */


var depsTree = {};

var envOptions = {
    /**jsdef
     *
     * 'lazy' : only resolve the resources when necessary
     * 'full' : resolve the full deps for the resources
     *
     * @todo: temporarily opened as 'full'
     */
    resolveMode: 'full',
    // resolveMode: 'lazy',
};

function depResolver(depsDef) {
    for (var key in depsDef) {
        if (depsDef.hasOwnProperty(key)) {

            // resolving the static dependencies
            if (key === '') {

            }
            // otherwise we have a look at the "dynamic" dependencies
            else {

            }
        }
    }
}


/**jsdef
 *
 * $Dep = {key: Dep | path}
 *  // path could be  'NPM_MODULE_NAME/path' as usually used
 *  // or '~some/path/under/src' starting with ~, relative to `src/`
 *  // @todo: however, this will be changed in the near future when it's more mature
 *  path: string    // will be resolved as a target path
 *
 * $RootDep = {}
 *  '': Dep     // Loads necessary atomie module at-front
 *
 *  // Defines all other dependencies that can be loaded later lazily
 *  // this is important for future use in client side
 *  key: Dep
 *      key: string     // a key will be corresponded to a ResolvePromise later
 *
 * // An AtomieModule is only allowed as an non-null Object
 * $AtomieModule = {key: any}
 *  key: string
 *
 * $ResolvedDeps = {key: AtomieModule | ResolvedDeps}
 *
 * $Resolver: (error, deps) => undefined
 *  error: null | Exception
 *  deps: ResolveDeps
 *
 * depsDef: RootDep
 * runner: (deps, lazy) => AtomieModule
 *  deps: ResolvedDeps
 *      // ResolvedDeps 的 key 与 RootDep[''] 里的 key 相对应
 *  lazy: {key: Resolver}
 *      key: string    // 与 RootDep 里的 非 `''` 的 key 相对应
 */
function atomie(depsDef, runner) {
    depResolver(depsDef, runner);
}

/**jsdef
 *
 *
 */
atomie.options = function(options) {
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            envOptions[key] = options[key];
        }
    }
};

global.atomie = atomie;