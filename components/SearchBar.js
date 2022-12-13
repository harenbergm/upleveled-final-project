import { css } from '@emotion/react';
import { useState } from 'react';

export default function SearchBar({
  handleCheck,
  placeholder,
  data,
  ingredients,
}) {
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

  // console.log('data', data);
  // console.log('ingredients', ingredients);

  function handleFilter(event) {
    const searchIngredient = event.target.value;
    setIngredientEntered(searchIngredient);
    const filteredIngredients = data.filter((filteredIngredient) => {
      return filteredIngredient.name
        .toLowerCase()
        .includes(ingredientEntered.toLowerCase());
    });
    setFilteredData(filteredIngredients);
  }

  function resetSearchFilter() {
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
          onClick={() => {
            resetSearchFilter();
          }}
        >
          X
        </button>
      </div>
      <div>
        {filteredData.map((value) => {
          return (
            <label id="ingredients" key={value.id}>
              {value.name}

              <input
                id="ingredients"
                checked={ingredients.includes(value.id)}
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
    </div>
  );
}
