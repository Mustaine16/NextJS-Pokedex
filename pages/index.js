import Head from 'next/head'
// import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home({ pokemons }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
          {pokemons.map((pokemon) => (
            <li>

              <Link href={`/${pokemon.id}`}>
                <a >
                  <article>
                    <h3>{`#${pokemon.paddingIndex}`} {pokemon.name}</h3>
                    <Image src={pokemon.imageUrl} width='100' height='100' />
                  </article>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {

  try {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150'

    const data = await fetch(url)
    const { results } = await data.json()

    const pokemons = results.map((pokemon, index) => {
      const paddingIndex = `00${index + 1}`.slice(-3)
      const imageUrl = `http://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddingIndex}.png`

      return {
        ...pokemon,
        id: index + 1,
        paddingIndex,
        imageUrl
      }
    })

    return {
      props: {
        pokemons
      }
    };

  } catch (error) {
    console.log(error);
    return {
      props: {
        pokemons: []
      }
    };
  }

}
