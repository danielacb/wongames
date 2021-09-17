import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import theme from 'styles/theme'

import GameCard from '.'

const props = {
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 'R$ 235'
}

describe('<GameCard />', () => {
  it('should render the GameCard', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: props.developer })
    ).toBeInTheDocument()

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img
    )

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render the price as a label', () => {
    renderWithTheme(<GameCard {...props} />)

    const price = screen.getByText(props.price)

    expect(price).not.toHaveStyleRule('text-decoration', 'line-through')
    expect(price).toHaveStyle({ backgroundColor: theme.colors.secondary })
  })

  it('should change style when there is a promotional price', () => {
    renderWithTheme(<GameCard {...props} promotionalPrice="R$ 200,00" />)

    expect(screen.getByText(props.price)).toHaveStyle({
      textDecoration: 'line-through'
    })

    expect(screen.getByText('R$ 200,00')).not.toHaveStyle({
      textDecoration: 'line-through'
    })
  })

  it('should render a solid Favorite icon when favorite is true', () => {
    renderWithTheme(<GameCard {...props} favorite />)

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should call onFav method when favorite icon is clicked', () => {
    const onFav = jest.fn()
    renderWithTheme(<GameCard {...props} onFav={onFav} />)

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(onFav).toBeCalled()
  })
})
