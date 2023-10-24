/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.jsx' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.tsx' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.jpg' {
  export default url
}
declare module '@/api/Visualization' {
  export default getVisualization
}
declare module '@/utils/index' {
  export { default as service } from './request'
  export { default as mockData } from './mockData'
  export { default as createRandom } from './createRandom'
}