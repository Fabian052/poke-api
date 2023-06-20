import { useParams } from "react-router-dom";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const pokeLinearGradients = {
  normal: "bg-gradient-to-t from-[#7C3F4C] via-[#BC6B7C] to-[#735259]",

  fighting: "bg-gradient-to-t from-[#CB735D] via-[#F1613C] to-[#96402A]",

  flying: "bg-gradient-to-t from-slate-50 via-purple-400 to-yellow-400",

  poison: "bg-gradient-to-t from-[#CE9BFF] via-[#A564E3] to-[#5B3184]",

  ground: "bg-gradient-to-t from-[#D69638] via-[#895C1A] to-[#654008]",

  rock: "bg-gradient-to-t from-[#D3D3D3] via-[#8D8D94] to-[#7E7E7E]",

  bug: "bg-gradient-to-t from-[#AAFFA8] via-[#3BB039] to-[#62DB60]",

  ghost: "bg-gradient-to-t from-[#787DDA] via-[#454AA8] to-[#323569]",

  steel: "bg-gradient-to-t from-[#A8A8A8] via-[#728881] to-[#5E736C]",

  fire: "bg-gradient-to-t from-[#E8AE1B] via-[#E35825] to-[#F96D6F]",

  water: "bg-gradient-to-t from-[#82B2F1] via-[#1479FB] to-[#133258]",

  grass: "bg-gradient-to-t from-[#CAE099] via-[#ABDAC6] to-[#7EC6C5]",

  electric: "bg-gradient-to-t from-yellow-200 to-yellow-500",

  psychic: "bg-gradient-to-b from-lime-800 via-lime-600 to-slate-100",

  ice: "bg-gradient-to-t from-[#BDEBFE] via-[#64CBF5] to-[#6FBEDF]",

  dragon: "bg-gradient-to-t from-[#A2BEC1] via-[#56A4AE] to-[#A2BEC1]",

  dark: "bg-gradient-to-t from-[#5A5E5D] via-[#0D1211] to-[#030706]",

  fairy: "bg-gradient-to-t from-[#CD7D98] via-[#C23867] to-[#971B45]",

  unknown: "bg-gradient-to-t from-slate-500 via-purple-400 to-slate-800",

  shadow: "bg-gradient-to-t from-[#5A5E5D] via-[#0D1211] to-[#030706]",
};

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

const bgColor = {
  "normal": 'bg-[#BC6B7C]',
  "fighting": 'bg-[#96402A]',
  "flying": 'bg-purple-400',
  "poison": 'bg-[#5B3184]',
  "ground": 'bg-[#654008]',
  "rock": 'bg-[#7E7E7E]',
  "bug": 'bg-[#62DB60]',
  "ghost": 'bg-[#323569]',
  "steel": 'bg-[#5E736C]',
  "fire": 'bg-[#E35825]',
  "water": 'bg-[#1479FB]',
  "grass": 'bg-[#ABDAC6]',
  "electric": 'bg-[#F5E755]',
  "psychic": 'bg-[#65743A]',
  "ice": 'bg-[#64CBF5]',
  "dragon": 'bg-[#478A93]',
  "dark": 'bg-[#030706]',
  "fairy": 'bg-[#971B45]',
  "unknown": 'bg-slate-500',
  "shadow": 'bg-[#16E0BD]'
}

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);
  console.log({ pokemon })
  const { pokemonName } = useParams();

  const percentProgressStat = (baseStat) => {
    const STAT_MAX = 255;
    return `${(baseStat * 100) / STAT_MAX}%`;
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    console.log(URL);

    axios
      .get(URL)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Header />

      <section className="my-[80px] mx-3 mdd:mx-[80px] mdd:my-[120px] max-w-[1024px] lgg+1:mx-auto">

        {/* Gradiant and image */}
        <section className={`relative mdd:h-36 h-28 ${pokeLinearGradients[pokemon?.types[0].type.name]}`}>
          <div className='absolute mdd:-bottom-2 -bottom-1 left-1/2 -translate-x-1/2'>
            <img
              className="max-w-[314px] mdd:px-8 px-[70px]"
              src={pokemon?.sprites.other['official-artwork'].front_default}
              alt={pokemon?.name}
            />
          </div>
        </section>

        {/* pokemon id  */}
        <div className="mt-6 flex justify-center">
          <h2 className={`text-center text-3xl mt-2 mdd:mt-8 inline py-1 px-4 font-medium border-[3px] border-gray-100 ${textColor[pokemon?.types[0].type.name]}`}>#{pokemon?.id}</h2>
        </div>

        {/* pokemon name   */}
        <h2 className={`text-center font-medium pt-4 text-4xl capitalize ${textColor[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h2>

        {/*   height, weight */}
        <section className="flex justify-center gap-12 pt-6">
          <div>
            <h4 className="font-medium">Height</h4>
            <p className="font-bold text-center">{pokemon?.height}</p>
          </div>

          <div>
            <h4 className="font-medium">Weight</h4>
            <p className="font-bold text-center">{pokemon?.weight}</p>
          </div>
        </section>

        {/* type and abilities  */}
        <section className="grid grid-cols gap-6 justify-center mdd:grid-cols-2 mt-6 justify-items-center capitalize">
          <div>
            <h2 className="text-center font-semibold">Type</h2>
            <div className="mt-4 flex gap-4 lgg:flex lgg:gap-6 text-balck">
              {
                pokemon?.types.map((type) =>
                  <span className={`px-3 py-1 lgg:px-6 lgg:py-1 text-white ${bgColor[pokemon?.types[0].type.name]}`} key={type.type.url}>{type.type.name}</span>
                )
              }
            </div>
          </div>

          <div>
            <h2 className="text-center font-semibold">Abilities</h2>
            <div className="mt-4 flex gap-4 lgg:flex lgg:gap-6 text-black">
              {
                pokemon?.abilities.slice(0, 2).map((ability) => (
                  <span className="border-[1px] py-1 px-3 border-gray-300 lgg:px-6 lgg:py-1" key={ability.ability.url}>{ability.ability.name}</span>
                ))
              }
            </div>
          </div>
        </section>


        <article>
          {/* stats */}
          <div className="flex justify-between items-center gap-4 mdd:gap-8 pt-12">
            <h3 className="font-semibold p-0 text-2xl mdd:text-3xl">Stats</h3>{" "}
            <div className="w-full h-[2px] bg-[#D3D3D3]"></div>
            <img src="/images/pokeballMain.png" alt="" />
          </div>
          <section className="mt-8">
            {pokemon?.stats.map((stat) => (
              <article
                className="font-bold grid gap-2 mt-2"
                key={stat.stat.url}
              >
                <section className="flex justify-between px-2 mdd:px-3">
                  <h5 className="text-sm mdd:text-base">{stat?.stat.name.toUpperCase()}</h5>
                  <span>{stat?.base_stat}</span>
                </section>

                {/* barra de progreso de stat */}
                <div className="bg-gray-200 h-8 overflow-hidden rounded-md">
                  <div
                    style={{ width: percentProgressStat(stat.base_stat) }}
                    className={`h-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 `}
                  ></div>
                </div>
              </article>
            ))}
          </section>
        </article>
      </section>

      {/* Movimientos */}
      <section className='mx-3 pb-8 lgg:max-w-[1024px] mdd:mx-[80px] lgg+1:mx-auto'>

        <div className='flex justify-between items-center gap-4 mdd:gap-8'>
          <h3 className='text-2xl mdd:text-4xl font-bold p-2'>Movements</h3>
          <div className="w-full h-[2px] bg-[#D3D3D3]"></div>
          <img src="/images/pokeballMain.png" alt="" />
        </div>

        <section className="mt-4 mdd:mt-8 p-2  flex flex-wrap gap-4 mdd:gap-8">
          {pokemon?.moves.map((move) => (
            <span className='p-2 bg-gray-200 rounded-2xl text-xs mdd:text-lg' key={move?.move.url}>{move?.move.name}</span>
          ))}
        </section>

      </section>
    </main>
  );
};
export default PokemonId;
