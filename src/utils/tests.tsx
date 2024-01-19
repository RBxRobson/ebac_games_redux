import { PreloadedState } from "@reduxjs/toolkit"
import { RenderOptions, render } from "@testing-library/react"
import { PropsWithChildren } from "react"

import {AppStore, RootState, configuraStore} from "../store"
import { Provider } from "react-redux";

//* interface com a tipagem de renderOptions mas omitindo queries
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    //* estado inicial
    preloadedState?: PreloadedState<RootState>;
    //* adicionando nossa store
    store?: AppStore
}

export function renderizaComProvider(
    //* aceitando um componente react como argumento
    elemento: React.ReactElement, 
    //* usando a interface ExtendedRenderOptions passamos como argumento
    //* o estado inicial e a configuração da store a partir do estado inicial(preloadedState)
    {
        preloadedState = {},
        store = configuraStore(preloadedState),
        ...opcoesAdicionais
    }: ExtendedRenderOptions = {} 
) {
    //* Função que irá encapsular os componentes react
    //* Recebe a um filho com argumento e faz a tipagem da props como filho sendo qualquer 
    //* elemento react
    function Encapsulador({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            //* Retorno do filho encapsulado pelo provider,
            //* configurando a store com o recebido pelo argumento da função pai
            <Provider store={store}>
                {children}
            </Provider>
        )
    }

    return {
        store,
        //* chamando a função render do testing library para renderizar 
        ...render(elemento, {
            //* Com o wrapper passamos o nosso encapsulador que retorna um elemento react
            wrapper: Encapsulador,
            ...opcoesAdicionais
        })
    }
}