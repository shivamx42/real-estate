import {FaSearch} from "react-icons/fa"
import { Link,useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"   // used to extract data from redux store
import { useEffect, useState } from "react";


export default function Header() {

  const {currentUser}=useSelector(state=>state.user);   // currentUser is extracted from the user slice
  const [searchTerm,setSearchTerm]=useState("");
  const navigate=useNavigate();

  const handleSubmit = (e) => {    // to be able to search the listings
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);   // to keep the previous queries in the url is something else changes
    urlParams.set('searchTerm', searchTerm);  // search term in the url will be changed to searchTerm variable
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);   // navigate the user to the new url
  };

  // to display the name change inside the search field
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-700'>Urban</span>
            <span className='text-slate-900'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>   
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/profile'>

            {currentUser?(
                
                <img className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar} alt="Profile Image" />
                

            ):(
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )
            }
          </Link>
        </ul>
      </div>
    </header>
  )
}
