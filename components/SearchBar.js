import { css } from '@emotion/react';
import { useState } from 'react';

export default function SearchBar({ handleCheck, placeholder, data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [ingredientEntered, setIngredientEntered] = useState('');

  const searchBarInputStyles = css`
    input {
      height: 30px;
      width: 300px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #006b4a;
      margin-right: 10px;
    }

    button {
      width: 40px;
      font-size: 16px;
      color: white;
      background-color: red;
    }
    button:hover {
      color: white;
      background-color: red;
    }
  `;
  // const [selectedIngredients, setSelectedIngredients] = useState([]);

  // function ShowIngredients() {
  //   const selectedIngr = data.filter((ingr) => {
  //     return ingr.id === ingredients.id;
  //   });
  //   // setSelectedIngredients(selectedIngr);
  //   console.log('selectedIngr', selectedIngr);
  // }

  // function handleCheck(value) {
  //   if (ingredients.includes(value)) {
  //     const filteredIngredient = ingredients.filter((ingredient) => {
  //       return ingredient !== value;
  //     });
  //     setIngredients(filteredIngredient);
  //   } else {
  //     setIngredients([...ingredients, value]);
  //     console.log('value', value);
  //   }
  // }

  // selects and filter the ingredients
  // function handleCheck(id) {
  //   if (ingredients.includes(id)) {
  //     const filteredIngredient = ingredients.filter((value) => {
  //       return value !== id;
  //     });
  //     setIngredients(filteredIngredient);
  //   } else {
  //     setIngredients([...ingredients, id]);
  //   }
  //   props.ingredientsChosen(ingredients);
  // }

  // console.log('data', data);
  // console.log('ingredients', ingredients);

  function handleFilter(event) {
    const searchIngredient = event.target.value;
    setIngredientEntered(searchIngredient);
    const filteredIngredients = data.filter((value) => {
      return value.name.toLowerCase().includes(ingredientEntered.toLowerCase());
    });
    setFilteredData(filteredIngredients);
  }

  function resetFilter() {
    setFilteredData(data);
    setIngredientEntered('');
  }

  return (
    <div className="search">
      <div className="searchInput" css={searchBarInputStyles}>
        <input
          type="text"
          placeholder={placeholder}
          value={ingredientEntered}
          onChange={handleFilter}
        />
        <button
          className="searchIcon"
          onClick={() => {
            resetFilter();
          }}
        >
          X
        </button>
      </div>
      <div className="dataResult">
        {filteredData.map((value) => {
          return (
            <label id="ingredients" key={value.id}>
              {value.name}
              {value.id}
              <input
                id="ingredients"
                value={value.id}
                type="checkbox"
                onChange={() => {
                  handleCheck(value.id);
                }}
              />
            </label>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
