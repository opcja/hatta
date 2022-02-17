import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { StructuredText } from "react-datocms"

export const query = graphql`
  query querySingleArticle($id: String!) {
    datoCmsArticle(id: { eq: $id }) {
      title
      author
      featuredImage {
        gatsbyImageData(placeholder: BLURRED)
      }
      articleContent {
        ... on DatoCmsImage {
          id
          image {
            gatsbyImageData
          }
        }
        ... on DatoCmsParagraph {
          id
          paragraph {
            value
          }
        }
        ... on DatoCmsSubtitle {
          id
          subtitle
        }
      }
    }
  }
`

const PostLayout = ({ data }) => {
  const Articleimage = getImage(data.datoCmsArticle.featuredImage)

  return (
    <div>
      <h1>{data.datoCmsArticle.title}</h1>
      <p>{data.datoCmsArticle.author}</p>
      <GatsbyImage image={Articleimage} alt="Moja mama" />
      <div>
        {data.datoCmsArticle.articleContent.map(item => {
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
      </div>
    </div>
  )
}

export default PostLayout
