import { useDispatch } from 'react-redux'
import FooterHome from '../components/home/FooterHome'
import { setNameTrainer } from '../store/slice/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    dispatch(setNameTrainer(nameTrainer))
    navigate('/pokedex')
  }
  return (
    <main className="min-h-screen grid grid-rows-[1fr_auto]">
      {/* top section  */}
      <section className='grid place-content-center'>
        <div >
          <img className='px-3' src="/images/logo.png" alt="" />
        </div>
        <h3 className="text-red-500 font-bold lgg:text-5xl text-4xl text-center pt-12">Hello trainer!</h3>
        <p className='text-center font-semibold pt-2'>For start, give me your name.</p>


        <form onSubmit={handleSubmit} className='flex justify-center pt-10'>
          <input placeholder='Type your name...' autoComplete='off' required type="text" className="outline-none shadow-md p-2" id="nameTrainer" />
          <button className="bg-[#D93F3F] hover:bg-[#e40f0f] hover:font-semibold px-2 lgg:px-4 text-white">Start!</button>
        </form>


      </section>

      {/* buttom section  */}
      <FooterHome />
    </main>
  )
}
export default Home
