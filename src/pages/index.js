import React from "react"
import { graphql } from "gatsby"
import Button from "../components/Button/Button"
import styled, { keyframes } from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const opacity = keyframes`
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
`

const ContentWrapper = styled.div`
  width: 60%;
  height: calc(100vh - 80px);
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 24px;
  animation: ${opacity} 1s linear;

  h1 {
    font-size: 82px;
    margin: 0;
    width: 45%;
    line-height: 95%;
  }

  p {
    margin: 30px 0 40px;
    width: 40%;
  }
`

const StyledImage = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100vh;
  object-fit: cover;
`

const IndexPage = ({ data }) => {
  const image = getImage(data.file)

  return (
    <>
      <ContentWrapper>
        {" "}
        <h1>You new space </h1>
        <p>
          While artists work from real to the abstract, architects must work
          from the abstract to the real.
        </p>
        <Button>estimate project</Button>
      </ContentWrapper>
      <StyledImage image={image} alt="świecąca lampka" />
    </>
  )
}

export const query = graphql`
  {
    file(name: { eq: "hero" }) {
      childImageSharp {
        gatsbyImageData(formats: [WEBP, AVIF], quality: 80)
      }
    }
  }
`

export default IndexPage
