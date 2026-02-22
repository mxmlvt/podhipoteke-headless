import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
	query GetAllPosts {
		posts(first: 100) {
			nodes {
				id
				title
				slug
				excerpt
				date
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
				categories {
					nodes {
						name
						slug
					}
				}
			}
		}
	}
`

export const GET_POST_BY_SLUG = gql`
	query GetPostBySlug($slug: ID!) {
		post(id: $slug, idType: SLUG) {
			id
			title
			slug
			content
			date
			modified
			excerpt
			featuredImage {
				node {
					sourceUrl
					altText
				}
			}
			categories {
				nodes {
					name
					slug
				}
			}
			seo {
				title
				metaDesc
				canonical
				opengraphTitle
				opengraphDescription
				opengraphImage {
					sourceUrl
				}
				breadcrumbs {
					text
					url
				}
			}
		}
	}
`

export const GET_ALL_SLUGS = gql`
	query GetAllSlugs {
		posts(first: 100) {
			nodes {
				slug
			}
		}
	}
`

export const GET_PAGE_BY_SLUG = gql`
	query GetPageBySlug($slug: ID!) {
		page(id: $slug, idType: URI) {
			id
			title
			slug
			content
			featuredImage {
				node {
					sourceUrl
					altText
				}
			}
			seo {
				title
				metaDesc
				canonical
				opengraphTitle
				opengraphDescription
				opengraphImage {
					sourceUrl
				}
			}
		}
	}
`

export const GET_ALL_PAGE_SLUGS = gql`
	query GetAllPageSlugs {
		pages(first: 200, where: { status: PUBLISH }) {
			nodes {
				slug
				uri
				status
			}
		}
	}
`

export const GET_MENU = gql`
	query GetMenu {
		menus {
			nodes {
				menuItems {
					nodes {
						label
						url
						path
					}
				}
			}
		}
	}
`

export const GET_RECENT_POSTS = gql`
	query GetRecentPosts($count: Int = 6) {
		posts(first: $count) {
			nodes {
				id
				title
				slug
				excerpt
				date
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
				categories {
					nodes {
						name
						slug
					}
				}
			}
		}
	}
`
