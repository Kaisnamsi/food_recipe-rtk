import React, { useState, useEffect } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import Card from './components/Card';
import Spinner from './components/Spinner';
import Modal from './components/Modal';
import { useGetRecipesMutation } from './services/recipeApi';

const options = [
  {
    label: 'Vegan',
    value: 'vegan',
  },
  {
    label: 'Vegetarian',
    value: 'vegetarian',
  },
  {
    label: 'Paleo',
    value: 'paleo',
  },
  {
    label: 'Dairy Free',
    value: 'dairy-free',
  },
  {
    label: 'Low Sugar',
    value: 'low-sugar',
  },
  {
    label: 'Egg Free',
    value: 'egg-free',
  },
];

const App = () => {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [health, setHealth] = useState('vegan');
  const [recipe, setRecipe] = useState({});
  const [show, setShow] = useState(false); // Add state for the modal
  const [getRecipes, { isLoading, data }] = useGetRecipesMutation();

  const getFoodRecipes = async () => {
    await getRecipes({ query, health });
  };

  useEffect(() => {
    const getFoodRecipes = async () => {
      await getRecipes({ query, health });
    };

    getFoodRecipes();
  }, [query, health, getRecipes]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleSearch = () => {
    setQuery(value);
    setValue('');
  };

  const handleClick = (e) => {
    setHealth(e.target.value);
  };

  // Define toggleShow function here
  const toggleShow = (recipe) => {
    setShow(!show);
    setRecipe(recipe);
  };

  return (
    <div
      className="App"
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '1000px',
        alignContent: 'center',
      }}
    >
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand className='text-center'>
            <h5 className='fw-bold mt-2'>Food Recipe App</h5>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div className='row g-1 aligh-items-center mt-2'>
        <MDBInput
          wrapperClass='col-auto'
          label='Search Recipe'
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className='col-auto'>
          <MDBBtn onClick={handleSearch}>Search</MDBBtn>
        </div>
        <div className='col-auto'>
          <select
            className='categoryDropdown'
            onChange={handleClick}
            value={health}
          >
            {options.map((option, index) => (
              <option value={option.value || ''} key={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {data?.hits?.map((item, index) => (
          <Card key={index} toggleShow={toggleShow} recipe={item.recipe} />
        ))}
      </div>
      {show && (
        <Modal
          show={show}
          setShow={setShow} // Pass setShow function here
          recipe={recipe}
          toggleShow={toggleShow}
        />
      )}
    </div>
  );
};

export default App;
