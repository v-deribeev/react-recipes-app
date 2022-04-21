import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { Link } from 'react-router-dom'

function Veggie() {
  const [veggies, setVeggies] = useState([])

  useEffect(() => {
    getVeggies()
  }, [])

  const getVeggies = async () => {
    const check = localStorage.getItem('veggies')
    if (check) {
      setVeggies(JSON.parse(check))
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=5d6771f8b9e84bd58cd3cae918e34d69&number=10&tags=vegetarian`
      )
      const data = await api.json()
      console.log('data', data)
      localStorage.setItem('veggies', JSON.stringify(data.recipes))
      setVeggies(data.recipes)
    }
  }

  return (
    <div>
      <Wrapper>
        <h3>Our Veggies</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
          }}
        >
          {veggies.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card key={recipe.id}>
                  <Link to={'/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            )
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 2rem 0rem;
`
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 0%;
    bottom: 0%;
    transform: translate(-50%; 0);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`

export default Veggie
