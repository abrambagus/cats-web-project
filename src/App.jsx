import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'
import React, { useState } from 'react'
import CatList from './components/CatList';

const App = () => {
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([])
  const [breed, setBreed] = useState()
  const [breedsListToggle, setBreedsListToggle] = useState(false)

  const fetchData = (page) => {
    setTimeout(() => {
      axios.get(`https://api.thecatapi.com/v1/breeds?limit=10&page=${page}`)
      .then((res) => {
        const newList = cats.concat(res.data);
        setCats(newList);

        if(res.data.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    
    }, 1500)
  }


  const handleBreeds = () => {
    setBreedsListToggle(true)
    axios.get("https://api.thecatapi.com/v1/breeds")
      .then((res) => {
        const newList = res.data.map((cat) => ({ id: cat.id, name:cat.name }))
        setBreeds(newList)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleSearch = (id) => {
    axios.get(`https://api.thecatapi.com/v1/breeds/${id}`)
      .then((res) => {
        setBreed(res.data)
        setBreedsListToggle(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  

  return (
    <div className="bg-white w-full">
      <nav className="bg-blue-600 flex w-full px-4 py-4">
        <h1 className="font-poppins font-semibold text-2xl cursor-pointer" onClick={() => window.location.reload()}>
          Cats Project
        </h1>
      </nav>
      <div className="w-full mt-3 px-4">
        <div className="flex justify-center items-center">
          <div className="relative">
            <button className="bg-blue-400 p-2 rounded-md font-poppins font-normal text-base" onClick={handleBreeds}>
              Select Breed
            </button>
            {breedsListToggle && (
              <div className="absolute rounded shadow bg-white overflow-y-auto flex-col w-full h-[400px] mt-1 border border-gray-200">
                {breeds.map((breed) =>(
                  <div class="cursor-pointer" onClick={() => handleSearch(breed.id)}>
                    <h1 class="block p-2 border-transparent border-l-4 hover:bg-gray-100">{breed.name}</h1>
                </div>
                ))}
              </div>
            )}
            
          </div>
        </div>
        {breed ? 
        (
          <CatList 
              image={breed?.image?.url}
              name={breed.name}
              description={breed.description}
              wikipediaUrl={breed.wikipedia_url}
            />
        ) : (
          <div className="overflow-y-auto h-full">
            <InfiniteScroll
            threshold={0}
            pageStart={-1}
            loadMore={fetchData}
            hasMore={hasMoreItems}
            loader={<div className="font-poppins font-semibold text-xl text-center">loading data ...</div>}>
              {cats.map((cat) => (
                <CatList 
                  key={cat.id}
                  image={cat?.image?.url}
                  name={cat.name}
                  description={cat.description}
                  wikipediaUrl={cat.wikipedia_url}
                />
              ))}
            </InfiniteScroll>
            {hasMoreItems ? "" : <h1 className="font-poppins font-semibold text-xl text-center">no data anymore ...</h1> }  
        </div>
        )}
      </div>
    </div>
  )
}

export default App
