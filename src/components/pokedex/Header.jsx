import { useDispatch } from "react-redux"
import { setNameTrainer } from "../../store/slice/nameTrainer.slice"

const Header = ({ handleDrakMode, isDark, setIsDark }) => {


  const dispatch = useDispatch()

  const handleClickLogout = () => {
    dispatch(setNameTrainer(""))
  }


  return (
    <div>
      <section className="relative">
        {/* red section  */}
        <div className='bg-red-600 h-20 relative'>
          <div className="absolute left-0 bottom-0 w-[210px] xxs:w-[280px] px-1 sm:w-[400px] mdd:pl-4">
            <img src="/images/logo.png" alt="" />
          </div>
        </div>

        {/* black section  */}
        <div className={`${isDark ? 'bg-red-600' : 'bg-black'} h-12 flex`}>
          <button onClick={handleClickLogout} className="absolute left-14 top-1/2 -translate-x-1/2 mdd:right-28 mdd:top-1/2 mdd:-translate-x-1/2 -bottom-4 text-white"><i className='bx bx-exit'></i> Log Out</button>
        </div>

        {/* pokeball button  */}
        <div className={`h-20 aspect-square  border-[10px]  rounded-full absolute right-0 -translate-x-1/2 after:content-[''] after:h-11 after:aspect-square after:rounded-full after:absolute after:top-1/2 after:bg-gray-700 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[9px] border-black after:border-black bg-white ${isDark ? 'bottom-1' : '-bottom-4'}`}>


        </div>
      </section >
    </div >
  )
}
export default Header
