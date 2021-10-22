import { EVENTTYPES } from "shared/constant";
export enum BREADCRUMB_TYPES {
  HTTP = 'http',
  CLICK = 'click',
  SCROLL = 'scroll',
  ERROR = 'error',
  HISTORY = 'history',
  HASH_CHANGE = 'hashChange',
  REJECTION = 'rejection',
  LOG = 'log'
 }
 
 export enum BREADCRUMB_CATEGORYS {
   HTTP = 'http',
   USER = 'user',
   DEBUG = 'debug',
   ROUTER = 'router',
   EXCEPTION = 'exception',
   LIFECYCLE = 'lifecycle'
 }

 export enum ReportDataType  {
  TRACK = 0,
  ERROR = 1
}
export enum UploadType {
  IMAGE = 0,
  XHR = 1,
  BEACON = 2
}
export type ReplaceCallback = (data: any) => void
export type Handlers  = { 
  [key in EVENTTYPES]?:ReplaceCallback[]
}