import ApiPromise from "@polkadot/api/promise";
import {WsProvider} from "@polkadot/api";
import {Wallet} from "../interfaces";
import {getConfiguration} from "../configuration";
import U8aFixed from "@polkadot/types/codec/U8aFixed";

let api: ApiPromise;
let provider: WsProvider;
let isConnecting: boolean;

/**
 * Initialize substrate api and awaits for it to be ready
 */
async function initApi(wsRpcUrl: string): Promise<ApiPromise> {
  provider = new WsProvider(wsRpcUrl);
  let api = new ApiPromise({
    initWasm: true,
    provider,
    types: {
      //tmp fix until we figure out how to update polkadot api lib
      ModuleId: U8aFixed,
      RuntimeDbWeight: {
        read: 'Weight',
        write: 'Weight'
      }
    }
  });
  try {
    api = await api.isReady;
  } catch (e) {
    console.log("Api is ready with error:", e);
  }
  return api;
}

export const resetApi = (): void => {
  if (api && provider) {
    try {
      api.disconnect();
    } catch (e) {
      console.log("Error on api disconnect.");
    }
    api = null;
    provider = null;
  }
};

export const getApi = async (wallet: Wallet): Promise<ApiPromise> => {
  if (!api) {
    // api not initialized or configuration changed
    const config = getConfiguration(wallet);
    console.log("TRY TO INIT API");
    api = await initApi(config.wsRpcUrl);
    console.log("API INITIALIZED");
    isConnecting = false;
  } else {
    while (isConnecting) {
      await new Promise(r => setTimeout(r, 100));
    }
    if (!provider.isConnected()) {
      isConnecting = true;
      await provider.connect();
      console.log(`AFTER DISCONNECT, PROVIDER STATUS CONNECTED: ${provider.isConnected()}`);
      isConnecting = false;
    }
  }
  return api;
};
