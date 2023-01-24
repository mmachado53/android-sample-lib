/******/ var __webpack_modules__ = ({

/***/ 43:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 231:
/***/ ((module) => {

module.exports = eval("require")("@googleapis/androidpublisher");


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ../../../.nvm/versions/node/v16.14.0/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@googleapis/androidpublisher
var androidpublisher = __nccwpck_require__(231);
// EXTERNAL MODULE: ../../../.nvm/versions/node/v16.14.0/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/core
var core = __nccwpck_require__(43);
;// CONCATENATED MODULE: ./googleApiHelper.js

const androidPublisher = androidpublisher.androidpublisher('v3');


let _editId = null;

const getEditId = async (appId)=>{
    if(_editId == null){
        const editIdResponse = await androidPublisher.edits.insert({
            auth: authClient,
            packageName: appId
        });
        if(editIdResponse.status!=200 || editIdResponse.data.id == null){
            throw new Error('Error getting an editId');
        }
        _editId = editIdResponse.data.id;
    }
    return _editId;
}

const LastVersionCode = async (appId, serviceAccountJsonFile)=>{
    core.exportVariable("GOOGLE_APPLICATION_CREDENTIALS", serviceAccountJsonFile);
    const auth = new androidpublisher.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/androidpublisher']
    });
    const authClient = await auth.getClient();
    const editId = await getEditId(appId);
    const tracksResponse = await androidPublisher.edits.tracks.list({
            auth: authClient,
            packageName: appId,
            editId: editId
        });
    if(tracksResponse.status != 200){
        throw new Error('Error getting tracks');
    }
    let result = -1;
    for(let trackIndex in tracksResponse.data.tracks ){
        let track = tracks.data.tracks[trackIndex]
        if(track && track.releases){
            for(let releaseIndex in track.releases){
                let release = track.releases[releaseIndex];
                let releaseVersionCodes = release.versionCodes;
                for(let versionCodeIndex in releaseVersionCodes){
                    let versionCode = parseInt(releaseVersionCodes[versionCodeIndex]);
                    if(versionCode > result){result = versionCode}
                }
            }
                
        }
    }
    return result;    
}

;// CONCATENATED MODULE: ./index.js



const serviceAccountJsonFile = core.getInput("serviceAccountJsonFile", { required: true });
const packageName = core.getInput("packageName", { required: true });

try{
    const versionCode = LastVersionCode(packageName, serviceAccountJsonFile);
    core.setOutput("versionCode", versionCode);
} catch (error){
    core.setFailed(error.message);
}

})();

