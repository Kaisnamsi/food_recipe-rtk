import React from 'react';
import {
  MDBCol,
  MDBCardGroup,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
} from 'mdb-react-ui-kit';

const Card = ({ recipe, toggleShow }) => {
  const handleClick = () => {
    toggleShow(recipe);
  };

  return (
    <>
      <MDBCol>
        <MDBCardGroup>
          <MDBCard className='h-100 mt-2 d-sm-flex'>
            <MDBCardImage
              src={recipe.image}
              alt={recipe.label}
              position='top'
              style={{ cursor: 'pointer' }}
              onClick={handleClick} // Call toggleShow function
            />
            <MDBCardBody>
              <h5 className='fw-bold'>{recipe.label}</h5>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBCol>
    </>
  );
};

export default Card;
