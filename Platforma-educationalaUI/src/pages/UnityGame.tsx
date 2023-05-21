import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "unity/UnityBuild.loader.js",
    dataUrl: "unity/UnityBuild.data",
    frameworkUrl: "unity/UnityBuild.framework.js",
    codeUrl: "unity/UnityBuild.wasm",
  });

  return <Unity style={{ width: "50%" }} unityProvider={unityProvider} />;
}

export default UnityGame;
