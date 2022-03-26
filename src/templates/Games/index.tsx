import { KeyboardArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'

import { useQueryGames } from 'graphql/queries/games'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard, { GameCardProps } from 'components/GameCard'
import { Grid } from 'components/Grid'
import Loading from 'components/Loading'
import Base from 'templates/Base'

import * as S from './styles'

export type GamesTemplateProps = {
  filterItems: ItemProps[]
  games?: GameCardProps[]
}

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  const { data, loading, fetchMore } = useQueryGames({
    variables: { limit: 15 }
  })

  const handleFilter = () => {
    return
  }

  const handleShowMore = () => {
    fetchMore({
      variables: { limit: 12, start: data?.games.length }
    })
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />

        {loading ? (
          <Loading />
        ) : (
          <section>
            <Grid>
              {data &&
                data.games.map((game) => (
                  <GameCard
                    key={game.slug}
                    slug={game.slug}
                    title={game.name}
                    developer={game.developers[0].name}
                    img={`http://localhost:1337${game.cover?.url}`}
                    price={game.price}
                  />
                ))}
            </Grid>

            <S.ShowMore role="button" onClick={handleShowMore}>
              <p>show more</p>
              <KeyboardArrowDown size={35} />
            </S.ShowMore>
          </section>
        )}
      </S.Main>
    </Base>
  )
}

export default GamesTemplate
