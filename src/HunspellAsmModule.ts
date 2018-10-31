/** @internal */
export type stringToUTF8Signature = (str: string, outPtr: number, maxBytesToWrite: number) => void;

/** @internal */
export type cwrapSignature = <T = Function>(fn: string, returnType: string | null, parameterType: Array<string>) => T;

/** @internal */
export type FILESYSTEMS = {
  NODEFS: any;
  MEMFS: any;
};

/**
 * Subset of internal filesystem api for wasm module.
 */
/** @internal */
export type FS = {
  filesystems: FILESYSTEMS;
  stat: (path: string) => import('fs').Stats;
  isDir: (mode: number) => boolean;
  isFile: (mode: number) => boolean;
  mkdir: (path: string, mode?: number) => void;
  mount: (type: FILESYSTEMS, option: { root?: string }, mountpoint: string) => void;
  writeFile: (path: string, data: ArrayBufferView, opts: { encoding?: string; flags?: string }) => void;
  unlink: (path: string) => void;
  unmount: (mountpoint: string) => void;
  rmdir: (path: string) => void;
};

/**
 * Interface for module generated by emscripten to load wasm binary.
 * https://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html
 */
/** @internal */
export interface HunspellAsmModule {
  cwrap: cwrapSignature;
  FS: FS;
  stringToUTF8: stringToUTF8Signature;
  stackAlloc: (length: number) => number;
  stackSave: () => number;
  stackRestore: (stack: number) => void;
  getValue: <T = any>(ptr: number, type: string, nosafe?: boolean) => T;
  Pointer_stringify: (ptr: number) => string;
  initializeRuntime(): Promise<boolean>;
}
