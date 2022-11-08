import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';

export default function RecipeUpload() {
  const recipeInstructionsStyles = css`
    width: 800px;
    height: 300px;
  `;

  const [recipeInstructions, setRecipeInstructions] = useState('');

  const [almond, setAlmond] = useState('');
  const [amaranth, setAmaranth] = useState('');
  const [apples, setApples] = useState('');
  const [apricots, setApricots] = useState('');
  const [avocados, setAvocados] = useState('');
  const [bananas, setBananas] = useState('');
  const [bacon, setBacon] = useState('');
  const [bakingPowder, setBakingPowder] = useState('');
  const [bayLeaves, setBayLeaves] = useState('');
  const [barley, setBarley] = useState('');
  const [beefChuck, setBeefChuck] = useState('');
  const [beefRibs, setBeefRibs] = useState('');
  const [beefTenderloin, setBeefTenderloin] = useState('');
  const [beefBrisket, setBeefBrisket] = useState('');
  const [butter, setButter] = useState('');
  const [buckWheat, setBuckWheat] = useState('');
  const [bulgur, setBulgur] = useState('');
  const [cheese, setCheese] = useState('');
  const [carrots, setCarrots] = useState('');
  const [cucumber, setCucumber] = useState('');
  const [celery, setCelery] = useState('');
  const [cremeFraiche, setCremeFraiche] = useState('');
  const [cherries, setCherries] = useState('');
  const [chiaSeeds, setChiaSeeds] = useState('');
  const [chickenBreast, setChickenBreast] = useState('');
  const [chickenLegs, setChickenLegs] = useState('');
  const [chickenThighs, setChickenThighs] = useState('');
  const [chickenWings, setChickenWings] = useState('');
  const [chocolate, setChocolate] = useState('');
  const [coconut, setCoconut] = useState('');
  const [cornFlour, setCornFlour] = useState('');
  const [cornMeal, setcornMeal] = useState('');
  const [duck, setDuck] = useState('');
  const [eggs, setEggs] = useState('');
  const [fish, setFish] = useState('');
  const [fetaCheese, setFetaCheese] = useState('');
  const [flour, setFlour] = useState('');
  const [garlic, setGarlic] = useState('');
  const [groundBeef, setGroundBeef] = useState('');
  const [groundChicken, setGroundChicken] = useState('');
  const [groundPork, setGroundPork] = useState('');
  const [groundTurkey, setGroundTurkey] = useState('');
  const [ketchup, setKetchup] = useState('');
  const [kidneyBeans, setKidneyBeans] = useState('');
  const [lamb, setLamb] = useState('');
  const [lasagnaSheets, setLasagnaSheets] = useState('');
  const [lemon, setLemon] = useState('');
  const [mustard, setMustard] = useState('');
  const [milk, setMilk] = useState('');
  const [mangos, setMangos] = useState('');
  const [millet, setMillet] = useState('');
  const [mushrooms, setMushrooms] = useState('');
  const [nutmeg, setNutmeg] = useState('');
  const [nectarines, setNectarines] = useState('');
  const [oliveOil, setOliveOil] = useState('');
  const [oatFlour, setOatFlour] = useState('');
  const [oats, setOats] = useState('');
  const [pumpkin, setPumpkin] = useState('');
  const [pepper, setPepper] = useState('');
  const [peaches, setPeaches] = useState('');
  const [peanutes, setPeanutes] = useState('');
  const [pears, setPears] = useState('');
  const [plums, setPlums] = useState('');
  const [pomegranates, setPomegranates] = useState('');
  const [porkRibs, setporkRibs] = useState('');
  const [porkShoulder, setPorkShoulder] = useState('');
  const [porkTenderloin, setPorkTenderloin] = useState('');
  const [quinoa, setQuinoa] = useState('');
  const [redWine, setRedWine] = useState('');
  const [redCabbage, setRedCabbage] = useState('');
  const [redOnions, setRedOnions] = useState('');
  const [sweetPotatoes, setSweetPotatoes] = useState('');
  const [salt, setSalt] = useState('');
  const [sourCream, setSourCream] = useState('');
  const [springOnion, setSpringOnion] = useState('');
  const [shrimps, setShrimps] = useState('');
  const [sirloin, setSirloin] = useState('');
  const [spelt, setSpelt] = useState('');
  const [steak, setSteak] = useState('');
  const [tapiocaFlour, setTapiocaFlour] = useState('');
  const [tomatoes, setTomatoes] = useState('');
  const [turkey, setTurkey] = useState('');
  const [vinegar, setVinegar] = useState('');
  const [veal, setVeal] = useState('');
  const [venison, setVenison] = useState('');
  const [whiteRiceFlour, setWhiteRiceFlour] = useState('');
  const [wildRice, setWildRice] = useState('');
  const [whiteBeans, setWhiteBeans] = useState('');
  const [whiteWine, setWhiteWine] = useState('');
  const [whiteOnions, setWhiteOnions] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const [almondMeal, setAlmondMeal] = useState('');

  function addAlmondMealToIngredientsNEW(event) {
    // setAlmondMeal(event.currentTarget.checked);
    const id = { id: 1 };
    setIngredients([...ingredients, id]);

    if (ingredients[0]) {
      setIngredients([]);
    }

    if (ingredients[ingredients.length - 1]) {
      setIngredients(ingredients.pop());
    }
  }

  function addAlmondMealToIngredients(event) {
    setAlmondMeal(event.currentTarget.checked);
    const id = { id: 1 };
    setIngredients([...ingredients, id]);
  }

  // if (ingredients === false) {
  //   setIngredients([ingredients.shift()]);
  // }

  //   setIngredients([...ingredients, id]);
  //   // return ingredients;
  // }

  // if (almondMeal === false) {
  //   setIngredients([ingredients.shift()]);
  //   return ingredients;
  // }

  console.log('almondMeal', almondMeal);
  console.log('ingredients', ingredients);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h4>Recipe Name</h4>

          <label>
            Title
            <input />
          </label>
        </div>
        <div>
          <h3>Chose Your Ingredients</h3>

          <label>
            Almond Meal
            <input
              type="checkbox"
              value={almondMeal}
              onChange={(event) => {
                addAlmondMealToIngredientsNEW(event);
              }}
            />
          </label>
          <label>
            Almond
            <input
              type="checkbox"
              value={almond}
              onChange={(event) => {
                setAlmond(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Amaranth
            <input
              type="checkbox"
              value={amaranth}
              onChange={(event) => {
                setAmaranth(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Apples
            <input
              type="checkbox"
              value={apples}
              onChange={(event) => {
                setApples(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Apricots
            <input
              type="checkbox"
              value={apricots}
              onChange={(event) => {
                setApricots(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Avocados
            <input
              type="checkbox"
              value={avocados}
              onChange={(event) => {
                setAvocados(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Bananas
            <input
              type="checkbox"
              value={bananas}
              onChange={(event) => {
                setBananas(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Bacon
            <input
              type="checkbox"
              value={bacon}
              onChange={(event) => {
                setBacon(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Baking Powder
            <input
              type="checkbox"
              value={bakingPowder}
              onChange={(event) => {
                setBakingPowder(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Bay Leaves
            <input
              type="checkbox"
              value={bayLeaves}
              onChange={(event) => {
                setBayLeaves(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Barley
            <input
              type="checkbox"
              value={barley}
              onChange={(event) => {
                setBarley(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Beef Chuck
            <input
              type="checkbox"
              value={beefChuck}
              onChange={(event) => {
                setBeefChuck(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Beef Ribs
            <input
              type="checkbox"
              value={beefRibs}
              onChange={(event) => {
                setBeefRibs(event.currentTarget.checked);
              }}
            />
          </label>
          <br />
          <label>
            Beef Tenderloin
            <input
              type="checkbox"
              value={beefTenderloin}
              onChange={(event) => {
                setBeefTenderloin(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Beef Brisket
            <input
              type="checkbox"
              value={beefBrisket}
              onChange={(event) => {
                setBeefBrisket(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Butter
            <input
              type="checkbox"
              value={butter}
              onChange={(event) => {
                setButter(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Buck Wheat
            <input
              type="checkbox"
              value={buckWheat}
              onChange={(event) => {
                setBuckWheat(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Bulgur
            <input
              type="checkbox"
              value={bulgur}
              onChange={(event) => {
                setBulgur(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Cheese
            <input
              type="checkbox"
              value={cheese}
              onChange={(event) => {
                setCheese(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Carrots
            <input
              type="checkbox"
              value={carrots}
              onChange={(event) => {
                setCarrots(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Carrots
            <input
              type="checkbox"
              value={carrots}
              onChange={(event) => {
                setCarrots(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Cucumber
            <input
              type="checkbox"
              value={cucumber}
              onChange={(event) => {
                setCucumber(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Celery
            <input
              type="checkbox"
              value={celery}
              onChange={(event) => {
                setCelery(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Creme Fraiche
            <input
              type="checkbox"
              value={cremeFraiche}
              onChange={(event) => {
                setCremeFraiche(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Cherries
            <input
              type="checkbox"
              value={cherries}
              onChange={(event) => {
                setCherries(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Chia Seeds
            <input
              type="checkbox"
              value={chiaSeeds}
              onChange={(event) => {
                setChiaSeeds(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Chicken Breast
            <input
              type="checkbox"
              value={chickenBreast}
              onChange={(event) => {
                setChickenBreast(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Chicken Legs
            <input
              type="checkbox"
              value={chickenLegs}
              onChange={(event) => {
                setChickenLegs(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Chicken Thighs
            <input
              type="checkbox"
              value={chickenThighs}
              onChange={(event) => {
                setChickenThighs(event.currentTarget.checked);
              }}
            />
          </label>
          <br />
          <label>
            Chicken Wings
            <input
              type="checkbox"
              value={chickenWings}
              onChange={(event) => {
                setChickenWings(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Chocolate
            <input
              type="checkbox"
              value={chocolate}
              onChange={(event) => {
                setChocolate(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Coconut
            <input
              type="checkbox"
              value={coconut}
              onChange={(event) => {
                setCoconut(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Corn Flour
            <input
              type="checkbox"
              value={cornFlour}
              onChange={(event) => {
                setCornFlour(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Corn Meal
            <input
              type="checkbox"
              value={cornMeal}
              onChange={(event) => {
                setcornMeal(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Duck
            <input
              type="checkbox"
              value={duck}
              onChange={(event) => {
                setDuck(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Eggs
            <input
              type="checkbox"
              value={eggs}
              onChange={(event) => {
                setEggs(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Fish
            <input
              type="checkbox"
              value={fish}
              onChange={(event) => {
                setFish(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Feta Cheese
            <input
              type="checkbox"
              value={fetaCheese}
              onChange={(event) => {
                setFetaCheese(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Flour
            <input
              type="checkbox"
              value={flour}
              onChange={(event) => {
                setFlour(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Garlic
            <input
              type="checkbox"
              value={garlic}
              onChange={(event) => {
                setGarlic(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Ground Beef
            <input
              type="checkbox"
              value={groundBeef}
              onChange={(event) => {
                setGroundBeef(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Ground Chicken
            <input
              type="checkbox"
              value={groundChicken}
              onChange={(event) => {
                setGroundChicken(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Ground Pork
            <input
              type="checkbox"
              value={groundPork}
              onChange={(event) => {
                setGroundPork(event.currentTarget.checked);
              }}
            />
          </label>
          <br />
          <label>
            Ground Turkey
            <input
              type="checkbox"
              value={groundTurkey}
              onChange={(event) => {
                setGroundTurkey(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Ketchup
            <input
              type="checkbox"
              value={ketchup}
              onChange={(event) => {
                setKetchup(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Kidney Beans
            <input
              type="checkbox"
              value={kidneyBeans}
              onChange={(event) => {
                setKidneyBeans(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Lamb
            <input
              type="checkbox"
              value={lamb}
              onChange={(event) => {
                setLamb(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Lasagna Sheets
            <input
              type="checkbox"
              value={lasagnaSheets}
              onChange={(event) => {
                setLasagnaSheets(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Lemon
            <input
              type="checkbox"
              value={lemon}
              onChange={(event) => {
                setLemon(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Mustard
            <input
              type="checkbox"
              value={mustard}
              onChange={(event) => {
                setMustard(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Milk
            <input
              type="checkbox"
              value={milk}
              onChange={(event) => {
                setMilk(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Mangos
            <input
              type="checkbox"
              value={mangos}
              onChange={(event) => {
                setMangos(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Millet
            <input
              type="checkbox"
              value={millet}
              onChange={(event) => {
                setMillet(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Mushrooms
            <input
              type="checkbox"
              value={mushrooms}
              onChange={(event) => {
                setMushrooms(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Nutmeg
            <input
              type="checkbox"
              value={nutmeg}
              onChange={(event) => {
                setNutmeg(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Nectarines
            <input
              type="checkbox"
              value={nectarines}
              onChange={(event) => {
                setNectarines(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Olive Oil
            <input
              type="checkbox"
              value={oliveOil}
              onChange={(event) => {
                setOliveOil(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Oat Flour
            <input
              type="checkbox"
              value={oatFlour}
              onChange={(event) => {
                setOatFlour(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Oats
            <input
              type="checkbox"
              value={oats}
              onChange={(event) => {
                setOats(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Pumpkin
            <input
              type="checkbox"
              value={pumpkin}
              onChange={(event) => {
                setPumpkin(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Pepper
            <input
              type="checkbox"
              value={pepper}
              onChange={(event) => {
                setPepper(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Peaches
            <input
              type="checkbox"
              value={peaches}
              onChange={(event) => {
                setPeaches(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Peanutes
            <input
              type="checkbox"
              value={peanutes}
              onChange={(event) => {
                setPeanutes(event.currentTarget.checked);
              }}
            />
          </label>
          <br />
          <label>
            Pears
            <input
              type="checkbox"
              value={pears}
              onChange={(event) => {
                setPears(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Plums
            <input
              type="checkbox"
              value={plums}
              onChange={(event) => {
                setPlums(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Pomegranates
            <input
              type="checkbox"
              value={pomegranates}
              onChange={(event) => {
                setPomegranates(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Pork Ribs
            <input
              type="checkbox"
              value={porkRibs}
              onChange={(event) => {
                setporkRibs(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Pork Shoulder
            <input
              type="checkbox"
              value={porkShoulder}
              onChange={(event) => {
                setPorkShoulder(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Pork Tenderloin
            <input
              type="checkbox"
              value={porkTenderloin}
              onChange={(event) => {
                setPorkTenderloin(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Quinoa
            <input
              type="checkbox"
              value={quinoa}
              onChange={(event) => {
                setQuinoa(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Red Wine
            <input
              type="checkbox"
              value={redWine}
              onChange={(event) => {
                setRedWine(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Red Cabbage
            <input
              type="checkbox"
              value={redCabbage}
              onChange={(event) => {
                setRedCabbage(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Red Onions
            <input
              type="checkbox"
              value={redOnions}
              onChange={(event) => {
                setRedOnions(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Sweet Potatoes
            <input
              type="checkbox"
              value={sweetPotatoes}
              onChange={(event) => {
                setSweetPotatoes(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Salt
            <input
              type="checkbox"
              value={salt}
              onChange={(event) => {
                setSalt(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Sour Cream
            <input
              type="checkbox"
              value={sourCream}
              onChange={(event) => {
                setSourCream(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Spring Onion
            <input
              type="checkbox"
              value={springOnion}
              onChange={(event) => {
                setSpringOnion(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Shrimps
            <input
              type="checkbox"
              value={shrimps}
              onChange={(event) => {
                setShrimps(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Sirloin
            <input
              type="checkbox"
              value={sirloin}
              onChange={(event) => {
                setSirloin(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Spelt
            <input
              type="checkbox"
              value={spelt}
              onChange={(event) => {
                setSpelt(event.currentTarget.checked);
              }}
            />
          </label>
          <br />
          <label>
            Steak
            <input
              type="checkbox"
              value={steak}
              onChange={(event) => {
                setSteak(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Tapioca Flour
            <input
              type="checkbox"
              value={tapiocaFlour}
              onChange={(event) => {
                setTapiocaFlour(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Tomatoes
            <input
              type="checkbox"
              value={tomatoes}
              onChange={(event) => {
                setTomatoes(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Turkey
            <input
              type="checkbox"
              value={turkey}
              onChange={(event) => {
                setTurkey(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Vinegar
            <input
              type="checkbox"
              value={vinegar}
              onChange={(event) => {
                setVinegar(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Veal
            <input
              type="checkbox"
              value={veal}
              onChange={(event) => {
                setVeal(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Venison
            <input
              type="checkbox"
              value={venison}
              onChange={(event) => {
                setVenison(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            White Rice Flour
            <input
              type="checkbox"
              value={whiteRiceFlour}
              onChange={(event) => {
                setWhiteRiceFlour(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Wild Rice
            <input
              type="checkbox"
              value={wildRice}
              onChange={(event) => {
                setWildRice(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            White Beans
            <input
              type="checkbox"
              value={whiteBeans}
              onChange={(event) => {
                setWhiteBeans(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            White Wine
            <input
              type="checkbox"
              value={whiteWine}
              onChange={(event) => {
                setWhiteWine(event.currentTarget.checked);
              }}
            />
          </label>
          <label>
            White Onions
            <input
              type="checkbox"
              value={whiteOnions}
              onChange={(event) => {
                setWhiteOnions(event.currentTarget.checked);
              }}
            />
          </label>
          <div>
            <h4>Instruction (max. 1000 chars)</h4>
            <input
              css={recipeInstructionsStyles}
              value={recipeInstructions}
              onChange={(event) => {
                setRecipeInstructions(event.currentTarget.value);
              }}
            />
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
