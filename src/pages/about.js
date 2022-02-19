import React from "react"
import { graphql } from "gatsby"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const query = graphql`
  query AboutQuery {
    datoCmsAbout(id: { eq: "DatoCmsAbout-109360433-pl" }) {
      id
      title
      paragraph {
        value
      }
      image {
        gatsbyImageData(placeholder: BLURRED)
        alt
      }
      description {
        value
      }
    }
  }
`

const AboutWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 12px;
`

const Paragraph = styled.div`
  width: 65%;
`

const Describtion = styled.div`
  margin: 64px 0;
  padding: 64px 112px 64px 0;
  position: relative;

  &::after,
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -14%;
    width: 116%;
    height: 3px;
    background-color: black;
  }

  &::before {
    top: auto;
    bottom: 0;
  }
`

const AboutPage = ({ data }) => {
  const aboutImage = getImage(data.datoCmsAbout.image)

  return (
    <>
      <AboutWrapper>
        <div>
          <h1>{data.datoCmsAbout.title}</h1>
          <Paragraph>
            <StructuredText data={data.datoCmsAbout.paragraph.value} />
          </Paragraph>

          <Describtion>
            <StructuredText data={data.datoCmsAbout.description.value} />
          </Describtion>
        </div>
        <div>
          <GatsbyImage image={aboutImage} alt={data.datoCmsAbout.image.alt} />
        </div>
      </AboutWrapper>
    </>
  )
}

export default AboutPage
