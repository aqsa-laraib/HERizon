import {localAnalysis,moderate} from '../domain/logic';
import type {Analysis} from '../domain/models';
// Replace this interface with authenticated backend calls when a server is commissioned.
// This prototype never sends emotional text or recordings to an LLM provider.
export const service={
 async analyze(text:string):Promise<Analysis>{return localAnalysis(text);},
 async moderate(text:string){return moderate(text);},
 async transcribe(_blob:Blob):Promise<string>{throw new Error('Uploaded recordings cannot be transcribed without a backend. Use browser dictation or add a transcript manually.');}
};
