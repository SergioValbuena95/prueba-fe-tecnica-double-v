import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('usePokemonStore', {
    state: () => ({
        myTeam: []
    }),
    actions: {
        GetMyTeam() {
            return this.myTeam
        },
        createTeam(pokemon) {
            if (this.myTeam.length < 6){
                this.myTeam.push(pokemon)
            }
        },
        selectPokemon(pokemon) {
            if (this.myTeam.length < 6 && !this.myTeam.includes(pokemon)) {
                pokemon.selected = !pokemon.selected
                this.myTeam.push(pokemon);
            } else {
                alert("Cannot add more than 6 Pokémon or Pokémon already in the team.")
            }
        },
        unselectPokemon(pokemon) {
            const index = this.myTeam.indexOf(pokemon);
            pokemon.selected = !pokemon.selected
            if (index > -1) {
                this.myTeam.splice(index, 1);
            }
        }
    }
})