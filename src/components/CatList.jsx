import React from 'react'
import { useState } from 'react'

const CatList = ({description, image, name, wikipediaUrl}) => {
    const [toggle, setToggle] = useState(false);

    return (
        <div className="border-b p-4 hover:bg-gray-100">
            <div className="flex justify-between cursor-pointer" onClick={()=> setToggle(!toggle)}>
            <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-3" src={`${image}`} alt="cat_img" />
                <h1 className="font-poppins font-normal text-base">
                    {name}
                </h1>
            </div>
            </div>
            {toggle && (
            <div className="ml-14">
                <h1 className="font-poppins font-normal text-base">
                    {description}
                </h1>
                <button className='bg-blue-400 p-1 rounded-md font-poppins font-normal text-base mt-2'
                    onClick={() => window.open(wikipediaUrl)}
                >
                    Wikipedia
                </button>
            </div>
            )}
        </div>
    )
}

export default CatList