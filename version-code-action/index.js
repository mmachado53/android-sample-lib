import {LastVersionCode} from './googleApiHelper.js';
import * as core from '@actions/core';

const serviceAccountJsonFile = core.getInput("serviceAccountJsonFile", { required: true });
const packageName = core.getInput("packageName", { required: true });

try{
    const versionCode = LastVersionCode(packageName, serviceAccountJsonFile);
    core.setOutput("versionCode", versionCode);
} catch (error){
    core.setFailed(error.message);
}
