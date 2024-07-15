import { gql, useQuery } from "@apollo/client";

interface Character {
  id: string
  name: string
  image: string
  species: string
}

export interface CharactersData {
  characters: {
    results: Character[];
    info: {
      pages: number;
    }
  }
}

export const GET_CHARACTERS = gql`
  query GetCharacters($name: String!, $page: Int!) {
    characters(page: $page, filter:{name: $name}) {
      results {
        id
        name
        image
        species
      }
      info {
        pages
      }
    }
  }
`
