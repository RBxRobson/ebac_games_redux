import { fireEvent, screen } from "@testing-library/react"

import { renderizaComProvider } from "../../../utils/tests"
import Produto from ".."

const jogo = {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windowns', 'PS5', 'Xbox S'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Hogwards Legacy'
}

describe('testes para o componente produto', () => {
    test('Deve renderizar corretamente', () => {
        renderizaComProvider(<Produto game={jogo}/>)
        expect(screen.getByText('Hogwards Legacy')).toBeInTheDocument()
    })

    test('Deve adicionar um item ao carrinho', () => {
        //* Para acessarmos nossa store e verificar se foi adicionado um item
        //* Temos que desestruturar a função e retirar a store
        const { store } = renderizaComProvider(<Produto game={jogo}/>)
        const btn = screen.getByTestId('btn-adicionar')
        fireEvent.click(btn)

        //* Com o expect acessamos a store com o getState, passamos
        //* o caminho e por fim a função toHaveLength para verificar seu tamanho
        expect(store.getState().carrinho.itens).toHaveLength(1)
    })
})