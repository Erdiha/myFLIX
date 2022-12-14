import React from 'react'
import useAuth,{ cardImagesUrl, handleRating, movieID, movieState,userLibrary } from '../data/data';
import Header from '../components/Header';
import Image from 'next/image'
import { useRecoilState } from 'recoil';
import ModalCard from '../components/ModalCard';

function MyLibrary() {
    const { currentUser } = useAuth();
    const lib = userLibrary(currentUser?.uid);
     const [displayModal, setDisplayModal] = useRecoilState(movieState);
    const [getMovie, setMovie] = useRecoilState(movieID);
  return (
          <div className='relative h-screen w-screen bg-gradient-to-t from-[rgb(173,221,208)] to-black flex flex-col '>
          
          <>
              <Header />
              <h1 className='p-5 absolute top-[7rem] md:top-[8rem]  text-center w-full md:text-start
          md:w-[18rem]  md:border-l-2 pl-[40px] md:p-2 ] md:border-red-500
           text-gray-200 text-xl md:ml-[5rem] font-bold md:text-[2rem]'>My Library</h1>
          {
              lib?.length > 0 ? (
                  <div id='movieSlide' className='flex   transition-all  p-3 mt-[11rem]
                    duration-300 ease-in-out   items-center  flex-wrap gap-2 justify-center md:gap-5 md:p-10 md:mt-[14rem]
                    overflow-x-scroll scrollbar-hide  '>
                        {lib && lib.map((flix) => 
                        (<div onClick={() => {
                            setMovie(flix);
                            setDisplayModal(true);
                        }} key={flix.id} className='relative h-[14rem]  min-w-[140px] cursor-pointer transition-all 
                        duration-300 ease-out md:h-[20rem] md:min-w-[200px] md:hover:scale-105'>
                           
                            <Image  
                                id='slide-image'
                                className="object-cover cover "
                                layout='fill'
                                src={`${flix.poster_path? cardImagesUrl+flix.poster_path: "http://via.placeholder.com/1080x1580" }`}
                            />
                            
                             <p className={`absolute h-8 w-8 md:w-10 md:h-10  text-black text-sm
                            bottom-[-10px] right-[2rem] rounded-full border-2
                            ${handleRating(flix)! > 50 ? (handleRating(flix)! > 80 ? "text-green-500 border-green-500"
                                    : "text-orange-300 border-orange-300") : "text-red-600 border-red-600"}
                             bg-slate-900 items-center flex justify-center md:font-bold`}>{handleRating(flix)+"%"}</p>
                        </div>)
                        )}
                      </div>) : (<div className='text-[1.2rem] text-red-300
               m-auto text-center w-full h-[20rem]  md:text[2rem]'>Add movies to display here...</div>) 
          }
           {displayModal && <ModalCard/>}
          </>
  
 </div>
  )
}

export default MyLibrary