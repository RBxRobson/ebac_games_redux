import { screen } from "@testing-library/react"
import Header from ".."
import { renderizaComProvider } from "../../../utils/tests"

describe('testes para o componente header', () => {
    test('deve renderizar corretamente', () => {
        // render(
        //     //* Quando trabalhamos com o redux, para o teste funcionar
        //     //* precisamos colocar o conteúdo de teste dentro do provider
        //     <Provider store={store}>
        //         <Header />
        //     </Provider>
        // )
        renderizaComProvider(<Header />)
        expect(screen.getByText('EBAC Games')).toBeInTheDocument()
    })

    test('deve renderizar com dois itens no carrinho', ()=> {
        renderizaComProvider(<Header />, {
            preloadedState: {
                carrinho: {
                    itens: [
                        {
                            id: 1,
                            categoria: 'RPG',
                            imagem: '',
                            plataformas: ['Windowns'],
                            preco: 150.9,
                            precoAntigo: 199.9,
                            titulo: 'Elden Ring'
                        },
                        {
                            id: 2,
                            categoria: 'RPG',
                            imagem: '',
                            plataformas: ['Windowns', 'PS5', 'Xbox S'],
                            preco: 199.9,
                            precoAntigo: 299.9,
                            titulo: 'Hogwards Legacy'
                        }
                    ]
                }
            }
        })

        expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
    })
})