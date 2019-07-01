const axios = require('axios');
const crypto = require('crypto');
const path = require(`path`)

// ******* API NODES

exports.sourceNodes = async ({ actions }) => {
    const { createNode } = actions;

    // Fetch data from the input API endpoint
    const fetchPosts = () => axios.get(`https://cms.theadhocracy.co.uk/posts.json`);
    const getFeed = await fetchPosts();

    const fetchArticles = () => axios.get(`https://cms.theadhocracy.co.uk/articles.json`);
    const getArticles = await fetchArticles();

    // Map results and create nodes
    getFeed.data.data.map((post, i) => {
        // Create node object
        const postsNode = {
            // Required fields for Gatsby
            id: `${i}`,
            parent: `__SOURCE__`,
            internal: {
                type: `Posts`, // name of the graphQL query --> allArticle {}
            },
            children: [],
            // Fields specific to this endpoint
            entryId: post.id,
            title: post.title,
            slug: post.slug,
            date: post.date,
            snippet: post.snippet,
            categories: post.categories,
            tags: post.tags
        }

        // Get content digest of node. (Required field)
        const contentDigest = crypto
            .createHash(`md5`)
            .update(JSON.stringify(postsNode))
            .digest(`hex`);
        postsNode.internal.contentDigest = contentDigest;

        // Create node with the gatsby createNode() API
        createNode(postsNode);
    });

    // Map results and create nodes
    getArticles.data.data.map((article, i) => {
        // Create node object
        const articlesNode = {
            // Required fields for Gatsby
            id: `${i}`,
            parent: `__SOURCE__`,
            internal: {
                type: `Article`, // name of the graphQL query --> allArticle {}
            },
            children: [],
            // Fields specific to this endpoint
            entryId: article.id,
            title: article.title,
            slug: article.slug,
            date: article.date,
            body: article.body,
            footnotes: article.footnotes,
            resources: article.resources,
            categories: article.categories,
            tags: article.tags
        }

        // Get content digest of node. (Required field)
        const contentDigest = crypto
            .createHash(`md5`)
            .update(JSON.stringify(articlesNode))
            .digest(`hex`);
        articlesNode.internal.contentDigest = contentDigest;

        // Create node with the gatsby createNode() API
        createNode(articlesNode);
    });

    return;
}

//******* PAGE CREATION

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(`
        {
            allArticle {
                nodes {
                    slug
                }
            }
        }
    `
    ).then(result => {
        result.data.allArticle.nodes.forEach(({ slug }) => {
            createPage({
                path: `/article/${slug}`,
                component: path.resolve(`./src/templates/article.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: slug,
                },
            })
        })
    })
}