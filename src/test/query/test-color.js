const query = `
query GetPikachuColor {
  pokemon(where: {name: {_eq: "pikachu"}}) {
    pokemonspecy {
      pokemoncolor {
        name
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
