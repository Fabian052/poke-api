import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonsList from "../components/pokedex/PokemonsList";
import "./styles/CardHover.css";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [namePokemon, setNamePokemon] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDark, setIsDark] = useState(false)

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(namePokemon.toLowerCase().trim())
  );

  const paginationLogic = () => {
    // Cantidad de pokemons por página
    const POKEMONS_PER_PAGE = 12;

    // Pokemons que se van a mostrar en la página actual
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;

    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    // Última página
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;

    // Bloque actual
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    // Páginas que se van a mostrar en el bloque actual
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }

    const handleDarkMode = () => setIsDark(!isDark)

    useEffect(() => {
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }, [isDark])

    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { lastPage, pagesInBlock, pokemonInPage } = paginationLogic();

  const handleClickPrevious = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNext = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNamePokemon(e.target.namePokemon.value);
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handleDarkMode = () => setIsDark(!isDark)

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

      axios
        .get(URL)
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}`;

      axios
        .get(URL)
        .then(({ data }) => {
          const pokemonsByType = data.pokemon.map((pokemon) => pokemon.pokemon);
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <main className={`${isDark ? 'bg-black' : 'bg-white'}`}>
      <Header handleDarkMode={handleDarkMode} isDark={isDark} setIsDark={setIsDark} />

      <div className="pl-3 pt-4">
        <button className={`${isDark ? 'text-white' : 'text-black'} p-1 text-2xl`} onClick={handleDarkMode}><i className='bx bxs-moon'></i></button>
      </div>

      <div className="min-w-[100%] lgg:pt-6 text-center mdd:text-center p-2 flex justify-center max-w-[1024px]">

        <p className="mt-6 text-[#FE1936] font-bold">
          Welcome {nameTrainer}!
          <span className={`${isDark ? 'text-white' : 'text-black'} font-normal`}>
            {' '} Here, you can find your favorite Pokemon.
          </span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mdd:flex flex flex-col items-center gap-2 mdd:justify-center mdd:gap-3 mdd:py-4 lgg:flex lgg:flex-row lgg:justify-around max-w-[1024px] mx-auto"
      >
        <div className="py-4 ">
          <input
            className="drop-shadow-md outline-none py-2 px-2 mdd:w-96 mdd:h-[48px] "
            id="namePokemon"
            placeholder="Type a pokemon name..."
            type="text"
          />
          <button className="bg-[#D93F3F] hover:bg-[#e40f0f] hover:font-semibold text-white p-2 mdd:p-3">
            Search
          </button>
        </div>



        <select
          onChange={handleChangeType}
          className="outline-none drop-shadow-md w-[250px] mdd:w-[400px] py-2 px-2 lgg:py-3 lgg:h-[48px]"
        >
          <option className=" focus:ring-red-400" value="">All pokemons</option>
          {types.map((type) => (
            <option className="focus:ring-red-400" value={type.name} key={type.url}>
              {" "}
              {type.name}
            </option>
          ))}
        </select>
      </form>

      <PokemonsList pokemons={pokemonInPage} />

      <div className="pb-10 mt-4">
        <ul className="flex gap-2 justify-center p-4 px-2 flex-wrap ">
          {/* Lógica de la primera página */}
          <li
            onClick={() => setCurrentPage(1)}
            className="p-3 bg-red-600 hover:bg-red-400 font-bold text-white rounded-md cursor-pointer "
          >
            {"<<"}
          </li>

          {/* Lógica de la página anterior */}
          <li
            onClick={handleClickPrevious}
            className="p-3 bg-red-600 font-bold hover:bg-red-400 text-white rounded-md cursor-pointer"
          >
            {"<"}
          </li>
          {pagesInBlock.map((numberPage) => (
            <li
              onClick={() => setCurrentPage(numberPage)}
              className={`p-3 bg-red-600 font-bold hover:bg-red-400 text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-red-500 hover:bg-red-400 p-4"
                }`}
              key={numberPage}
            >
              {numberPage}
            </li>
          ))}
          {/* Lógica de la página siguiente */}
          <li
            onClick={handleClickNext}
            className="p-3 bg-red-600 hover:bg-red-400 font-bold text-white rounded-md cursor-pointer"
          >
            {">"}
          </li>

          {/* Última página */}
          <li
            onClick={() => setCurrentPage(lastPage)}
            className="p-3 bg-red-600 hover:bg-red-400 font-bold text-white rounded-md cursor-pointer"
          >
            {">>"}
          </li>
        </ul>
      </div>
    </main>
  );
};
export default Pokedex;
