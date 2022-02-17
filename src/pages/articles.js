import React from "react"
import { graphql } from "gatsby"
import ArticlesPreview from "../components/ArticlesPreview/ArticlesPreview"
import styled from "styled-components"
import PageInfo from "../components/PageInfo/PageInfo"
import slugify from "slugify"
import { getImage } from "gatsby-plugin-image"

const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
`

const pageData = {
  title: "articles",
  paragraph: `While artists work from real to the abstract, architects must work from the abstract to the real.`,
}

const ArticlesPage = ({ data }) => {
  const {
    allDatoCmsArticle: { nodes },
  } = data

  return (
    <>
      <PageInfo title={pageData.title} paragraph={pageData.paragraph} />
      <ArticlesWrapper>
        {nodes.map(({ title, featuredImage }) => (
          <ArticlesPreview
            key={title}
            title={title}
            background={featuredImage.url}
            slug={slugify(title, { lower: true })}
          />
        ))}
      </ArticlesWrapper>
    </>
  )
}

export const query = graphql`
  {
    allDatoCmsArticle {
      nodes {
        title
        featuredImage {
          url
        }
      }
    }
  }
`

export default ArticlesPage
