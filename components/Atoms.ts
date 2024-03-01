import {  atom} from 'jotai';
import { User} from '../types';
import TemporaryUrl from '../temporaryUrl';

const senderSocket = atom <WebSocket |null> (null)
const userDetailes = atom <User |null> (null)
const baseurlAtom = atom (`https://app-http-server.vercel.app/`)


export {senderSocket,userDetailes,baseurlAtom}