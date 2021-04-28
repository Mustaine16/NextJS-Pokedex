import Link from 'next/Link'
export default function PokemonData({ pokemon }) {
  return (
    <main>
        <Link href="/">
          <a >Back to home</a>
        </Link>
      <h1>{pokemon.name}</h1>
    </main>
  )
}



export async function getServerSideProps({ query }) {


  try {
    const { id } = query
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const data = await fetch(url)
    const pokemon = await data.json()

    const paddingIndex = `00${pokemon.id}`.slice(-3)
    const imageUrl = `http://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddingIndex}.png`


    pokemon.paddingIndex = paddingIndex
    pokemon.imageUrl = imageUrl
    return {
      props: { pokemon }
    };

  } catch (error) {
    console.log(error);
    return {
      props: { pokemon: [] }
    };
  }

}

