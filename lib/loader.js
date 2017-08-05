/**
 * @file Atomie for the nodejs side
 * @author Liang
 */
let depsTree = {};

/**
 * $AtomieOptions = {}
 *  // 'lazy' : only resolve the resources when necessary
 *  // 'full' : resolve the full deps for the resources
 *  resolveMode: 'full' | 'lazy'
 *
 * @type {AtomieOptions}
 */
let envOptions = {
    // @todo: temporarily opened as 'full'
    resolveMode: 'full',
    // resolveMode: 'lazy',
};


function resolveProjectPath() {

}

function pushDep(depDef, sourcePath) {

}

/**
 * Passing the dep def in and resolve it
 *
 * @param {object} depsDef : Dep
 * @param {boolean} isRoot Process as root dep or lazy dep
 */
function depResolver(depsDef, isRoot) {
    for (let key in depsDef) {
        if (depsDef.hasOwnProperty(key)) {

            // resolving the static dependencies
            if (key === '' && isRoot) {
                
            }
            // otherwise we have a look at the "dynamic" dependencies
            else {

            }
        }
    }
}


/**
 *
 * $Dep = {key: Dep | path}
 *  // path could be  'NPM_MODULE_NAME/path' as usually used
 *  // or '~some/path/under/src' starting with ~, relative to `src/`
 *  // @todo: however, this will be changed in the near future when it's more mature
 *  path: string    // will be resolved as a target path
 *
 *
 * $RootDep = {key: Dep}
 *  // '' denotes default modules. i.e. modules to be loaded at-front
 *  // other string denotes for lazy moduels
 *  key: string
 *
 *
 * // An AtomieModule is only allowed as an non-null Object
 * $AtomieModule = {key: any}
 *  key: string
 *
 *
 * $ResolvedDeps = {key: AtomieModule | ResolvedDeps}
 *
 *
 * $Resolver: (error, deps) => undefined
 *  error: null | Exception
 *  deps: ResolveDeps
 *
 *
 * @param {object} depsDef : RootDep
 * @param {function} runner (deps, lazy) => AtomieModule
 *  deps: ResolvedDeps
 *      // ResolvedDeps 的 key 与 RootDep[''] 里的 key 相对应
 *  lazy: {key: Resolver}
 *      key: string    // 与 RootDep 里的 非 `''` 的 key 相对应
 */
function atomie(depsDef, runner) {
    depResolver(depsDef, runner);
}

/**
 *  To set the options for server-side atomie
 *
 *  @param {object} options : AtomieOptions
 */
atomie.setOptions = function(options) {
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            envOptions[key] = options[key];
        }
    }
};

global.atomie = atomie;