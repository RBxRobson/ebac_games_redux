import { render, screen } from "@testing-library/react"
import Header from ".."
import { Provider } from "react-redux"
import { store } from "../../../store"

describe('testes para o componente header', () => {
    test('deve renderizar corretamente', () => {
        render(
            
            //* Quando trabalhamos com o redux, para o teste funcionar
            //* precisamos colocar o conteúdo de teste dentro do provider
            <Provider store={store}>
                <Header />
            </Provider>
        )
        expect(screen.getByText('EBAC Games')).toBeInTheDocument()
    })
})