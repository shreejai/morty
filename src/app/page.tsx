'use client'
import SearchBar from "@/components/SearchBar";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";
import { GET_CHARACTERS, CharactersData } from "@/lib/fetch-data";

// interface Character {
//   id: string
//   name: string
//   image: string
//   species: string
// }

// interface CharactersData {
//   characters: {
//     results: Character[];
//     info: {
//       pages: number;
//     }
//   }
// }

// export const GET_CHARACTERS = gql`
//   query GetCharacters($name: String!, $page: Int!) {
//     characters(page: $page, filter:{name: $name}) {
//       results {
//         id
//         name
//         image
//         species
//       }
//       info {
//         pages
//       }
//     }
//   }
// `

export default function Home() {

  const [name, setName] = useState('');
  const [page, setPage] = useState(1);

  const {data, loading, error} = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: {name, page}
  });

  if(error) console.log(error);

  const isLastPage = data?.characters.info.pages  === page;

  return (
    <>
    <main className="p-6 text-center">
      <h1 className="mb-2">Rick and Morty Characters</h1>
      <SearchBar onSearch={setName}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {loading ? <p>Loading...</p> :data?.characters.results.map(({ id, name, image, species }) => (
            <div
              key={id}
              className='flex flex-col items-center justify-center space-y-4 p-4 dark:bg-neutral-900 bg-neutral-100 border border-neutral-200 dark:border-neutral-800 rounded-md shadow'
            >
              <Image
                className='rounded-full w-32 h-32'
                src={image}
                alt={name}
                width={128}
                height={128}
              />
              <p className='text-xl font-mono font-medium dark:text-neutral-200 text-neutral-800'>
                {name}
              </p>
              <p>{species}</p>
              <a href={`/character/${id}`} className='bg-slate-500 w-fit px-4 py-2 hover:bg-white hover:text-black'>Read more</a>
            </div>
          ))}
      </div>
      <div className="flex gap-4 items-center justify-center">
        {(page >= 1) &&
          <button className="bg-slate-500 px-4 py-2 disabled:bg-slate-700 disabled:text-slate-500" onClick={()=>{setPage(page - 1)}} disabled={page === 1}>
            Previous
          </button>
        }
          <button className="bg-slate-500 px-4 py-2 disabled:bg-slate-700 disabled:text-slate-500" onClick={()=>{setPage(page + 1)}} disabled={isLastPage}>
            Next
          </button>
      </div>
    </main>
    </>
  );
}
