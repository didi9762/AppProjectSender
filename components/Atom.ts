import {  atom} from 'jotai';
import { socketType } from '../types';

const snederSocket = atom <socketType | null>(null)


export default snederSocket