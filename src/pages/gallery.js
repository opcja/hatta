import React from "react"
import { graphql } from "gatsby"
import { StructuredText } from "react-datocms"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

export const query = graphql`
  query GalleryPageQuery {
    datoCmsGalery(id: { eq: "DatoCmsGalery-109052198-pl" }) {
      title
      description {
        value
      }
      images {
        gatsbyImageData(placeholder: BLURRED)
      }
      galleryContent {
        ... on DatoCmsSubtitle {
          id
          subtitle
        }
        ... on DatoCmsParagraph {
          id
          paragraph {
            value
          }
        }
        ... on DatoCmsImage {
          id
          image {
            gatsbyImageData
          }
        }
      }
    }
  }
`
const GalleryWraper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;
  margin-top: 68px;
  margin-bottom: 12px;
`

const GalleryPage = ({ data }) => {
  return (
    <>
      <h1>{data.datoCmsGalery.title}</h1>
      <StructuredText data={data.datoCmsGalery.description.value} />
      <GalleryWraper>
        {data.datoCmsGalery.images.map((img, index) => {
          const galleryImage = getImage(img)
          return (
            <GatsbyImage
              image={galleryImage}
              alt=""
              key={`photo number ${index}`}
            />
          )
        })}
      </GalleryWraper>
      {data.datoCmsGalery.galleryContent.map(item => {
        const itemKey = Object.keys(item)[1]

        switch (itemKey) {
          case "paragraph": {
            return <StructuredText key={item.id} data={item[itemKey]} />
          }
          case "subtitle":
            return <h2 key={item.id}>{item[itemKey]}</h2>
          case "image": {
            const contentImage = getImage(item[itemKey])
            return <GatsbyImage key={item.id} alt="" image={contentImage} />
          }
          default:
            return null
        }
      })}
    </>
  )
}

export default GalleryPage
