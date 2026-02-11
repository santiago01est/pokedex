const query = `
query GetPikachu {
  pokemon(where: {name: {_eq: "pikachu"}}) {
    id
    name
    height
    weight
    pokemontypes {
      type {
        name
      }
    }
    pokemonstats {
      base_stat
      stat {
        name
      }
    }
    pokemonabilities {
      ability {
        name
      }
    }
    pokemonspecy {
      pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
        flavor_text
      }
    }
  }
}
`;

async function test() {
    try {
        const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const result = await response.json();
        console.log(JSON.stringify(result, null, 2));
    } catch (err) {
        console.error(err);
    }
}

test();
