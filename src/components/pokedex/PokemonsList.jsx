import PokemonCard from './PokemonCard'

const PokemonsList = ({ pokemons }) => {
  return (
    <section className='grid gap-8 grid-cols-[repeat(auto-fill,_300px)] justify-center max-w-[1024px] mx-auto py-8 '>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
      ))}
    </section>
  )
}
export default PokemonsList
