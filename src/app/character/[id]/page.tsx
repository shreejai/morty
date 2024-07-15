'use client';
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Params {
  id: string
}

interface PageProps {
  params: Params
}

interface Episode {
  id: string;
  name: string;
}

interface Character {
  id: string
  name: string
  image: string
  species: string
  status: string
  episode: Episode[]
}

interface CharacterData {
  character:  Character;
}

const GET_CHARACTER = gql`
query GetCharacter($id: ID!){
  character(id: $id) {
    id
    name
    image
    species
    status
    episode {
      id
      name
    }
  }
}
`

const Page: React.FC<PageProps> = ({params}) => {
  const id = params.id;
  const {data, loading, error} = useQuery<CharacterData>(GET_CHARACTER, {
    variables: {id}
  });
  if (loading) return <p className='flex items-center justify-center'>Loading...</p>;
  if(error) console.log(error);

  const character = data?.character;
  
  return (
    <div className='p-4 text-center mx-auto w-fit flex flex-col gap-4'>
      <Link href='/' className='text-left text-slate-400 hover:text-white'>{`<--Back`}</Link>
      <h1 className='text-2xl font-bold'>Character Details</h1>

      {character && (
        <div key={character.id} className='flex flex-col gap-4'>
          <h2><span className='text-slate-400'>Name:</span> {character.name}</h2>
          <Image src={character.image} alt={character.name} width={200} height={200} className='mx-auto'/>
          <p><span className='text-slate-400'>Species:</span> {character.species}</p>
          <p><span className='text-slate-400'>Status:</span> {character.status}</p>
          <div className='text-left'>
            <h3 className='text-xl text-slate-400'>Seen in:</h3>
          {character.episode.map(({id, name})=>(
            <div key={id}><span className='text-slate-400'>Ep.{id}:</span> {name}</div>
          ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page