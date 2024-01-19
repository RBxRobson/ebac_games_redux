import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';
import carrinhoReducer from './reducers/carrinho'

import api from '../services/api'

// export const store = configureStore({
//   reducer: {
//     carrinho: carrinhoReducer,
//     [api.reducerPath]: api.reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware)
// })

const rootReducer = combineReducers({
  carrinho: carrinhoReducer,
  [api.reducerPath]: api.reducer
})

export type RootState = ReturnType<typeof rootReducer>

//* Função responsável por configurar a store
export function configuraStore(preloadedState?: PreloadedState<RootState>){
  //* Nos testes, usamos o preloadedState para configurar a store 
  //* com um estado específico antes de executar as ações e as verificações nos testes. 
  //* Isso permite criar cenários de teste mais específicos.


  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  })

  setupListeners(store.dispatch)

  return store


}

export type AppStore = ReturnType<typeof configureStore>
