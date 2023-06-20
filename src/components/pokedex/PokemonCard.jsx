import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const pokeLinearGradients = {
  "normal": 'bg-gradient-to-t from-[#7C3F4C] via-[#BC6B7C] to-[#735259]',

  "fighting": 'bg-gradient-to-t from-[#CB735D] via-[#F1613C] to-[#96402A]',

  "flying": 'bg-gradient-to-t from-slate-50 via-purple-400 to-yellow-400',

  "poison": 'bg-gradient-to-t from-[#CE9BFF] via-[#A564E3] to-[#5B3184]',

  "ground": 'bg-gradient-to-t from-[#D69638] via-[#895C1A] to-[#654008]',

  "rock": 'bg-gradient-to-t from-[#D3D3D3] via-[#8D8D94] to-[#7E7E7E]',

  "bug": 'bg-gradient-to-t from-[#AAFFA8] via-[#3BB039] to-[#62DB60]',

  "ghost": 'bg-gradient-to-t from-[#787DDA] via-[#454AA8] to-[#323569]',

  "steel": 'bg-gradient-to-t from-[#A8A8A8] via-[#728881] to-[#5E736C]',

  "fire": 'bg-gradient-to-t from-[#E8AE1B] via-[#E35825] to-[#F96D6F]',

  "water": 'bg-gradient-to-t from-[#82B2F1] via-[#1479FB] to-[#133258]',

  "grass": 'bg-gradient-to-t from-[#CAE099] via-[#ABDAC6] to-[#7EC6C5]',

  "electric": 'bg-gradient-to-t from-yellow-200 to-yellow-500',

  "psychic": 'bg-gradient-to-b from-lime-800 via-lime-600 to-slate-100',

  "ice": 'bg-gradient-to-t from-[#BDEBFE] via-[#64CBF5] to-[#6FBEDF]',

  "dragon": 'bg-gradient-to-t from-[#A2BEC1] via-[#56A4AE] to-[#A2BEC1]',

  "dark": 'bg-gradient-to-t from-[#5A5E5D] via-[#0D1211] to-[#030706]',

  "fairy": 'bg-gradient-to-t from-[#CD7D98] via-[#C23867] to-[#971B45]',

  "unknown": 'bg-gradient-to-t from-slate-500 via-purple-400 to-slate-800',

  "shadow": 'bg-gradient-to-t from-[#5A5E5D] via-[#0D1211] to-[#030706]'
}


const textColor = {
  "normal": 'text-[#735259]',
  "fighting": 'text-[#96402Ah]',
  "flying": 'text-purple-400',
  "poison": 'text-[#5B3184]',
  "ground": 'text-[#654008]',
  "rock": 'text-[#7E7E7E]',
  "bug": 'text-[#4AB648]',
  "ghost": 'text-[#323569]',
  "steel": 'text-[#5E736C]',
  "fire": 'text-[#E75C35]',
  "water": 'text-[#1479FB]',
  "grass": 'text-[#416460]',
  "electric": 'text-[#E5D734]',
  "psychic": 'text-[#65743A]',
  "ice": 'text-[#6FBEDF]',
  "dragon": 'text-[#478A93]',
  "dark": 'text-[#030706]',
  "fairy": 'text-[#971B45]',
  "unknown": 'text-slate-500',
  "shadow": 'text-[#16E0BD]'
}

const borderColor = {
  "normal": 'border-[#BC6B7C]',
  "fighting": 'border-[#96402A]',
  "flying": 'border-purple-400',
  "poison": 'border-[#5B3184]',
  "ground": 'border-[#654008]',
  "rock": 'border-[#7E7E7E]',
  "bug": 'border-[#62DB60]',
  "ghost": 'border-[#323569]',
  "steel": 'border-[#5E736C]',
  "fire": 'border-[#E35825]',
  "water": 'border-[#1479FB]',
  "grass": 'border-[#ABDAC6]',
  "electric": 'border-[#F5E755]',
  "psychic": 'border-[#65743A]',
  "ice": 'border-[#64CBF5]',
  "dragon": 'border-[#478A93]',
  "dark": 'border-[#030706]',
  "fairy": 'border-[#971B45]',
  "unknown": 'border-slate-500',
  "shadow": 'border-[#16E0BD]'
}

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null)



  const formatTypePokemon = (types = []) => {
    const nameTypes = types.map((type) => type.type.name)
    const titleTypes = nameTypes.join(" / ")
    return titleTypes
  }



  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .then((err) => console.log(err))
  }, [])



  return (
    <Link className={`border-[10px] rounded-xl capitalize ${borderColor[pokemon?.types[0].type.name]} hvr-grow `} to={`/pokedex/${pokemon?.name}`}>
      {/* top section  */}
      <section className={`relative h-36 ${pokeLinearGradients[pokemon?.types[0].type.name]}`}>
        <div className='absolute px-12 -bottom-14'>
          <img
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt={pokemon?.name}
          />
        </div>
      </section>

      {/* bottom section  */}
      <section>
        <h3 className={`mt-14 text-center font-bold text-2xl ${textColor[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
        <h5 className='text-center font-semibold text-[#4F4F4F]'>{formatTypePokemon(pokemon?.types)}</h5>
        <p className='text-center pb-3 pt-1 text-sm text-[#9F9F9F]'>Type</p>

        <hr />

        <section className='grid grid-cols-[repeat(auto-fill,_110px)] px-3 pt-2 place-content-between'>
          {/*  Generar lista de stats */}

          {
            pokemon?.stats.slice(0, 4).map(stat => (
              <div className='text-center grid content-center ' key={stat.stat.url}>
                <h6 className='font-normal text-lg text-[#9F9F9F]'>{stat.stat.name}</h6>
                <span className={`${textColor[pokemon?.types[0].type.name]} font-bold pb-5`}>{stat.base_stat}</span>
              </div>
            ))
          }

        </section>

      </section>

    </Link>
  )
}
export default PokemonCard
