'use client';
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image';
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
  if(error) console.log(error);

  const character = data?.character;
  
  return (
    <div className='p-4 text-center max-w-[700px] mx-auto'>
      <h1>Character Details</h1>

      {character && (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <Image src={character.image} alt={character.name} width={100} height={100} className='mx-auto'/>
          <p>Species:{character.species}</p>
          <p>Status: {character.status}</p>
          <div className='text-left'>
          {character.episode.map(({id, name})=>(
            <div key={id}>Episode{id}: {name}</div>
          ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page