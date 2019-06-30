const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions }) => {
    const { createNode } = actions;

    // Fetch data from the input API endpoint
    const fetchPosts = () => axios.get(`https://cms.theadhocracy.co.uk/posts.json`);
    const res = await fetchPosts();

    const fetchArticle = () => axios.get(`https://cms.theadhocracy.co.uk/article/1363.json`);
    const getArticle = await fetchArticle();

    // Map results and create nodes
    res.data.data.map((post, i) => {
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
    // getArticle.data.map((article, i) => {
    // Create node object

    const articleNode = {
        // Required fields for Gatsby
        id: `1`,
        parent: `__SOURCE__`,
        internal: {
            type: `Article`, // name of the graphQL query --> allArticle {}
        },
        children: [],
        // Fields specific to this endpoint
        entryId: getArticle.data.id,
        title: getArticle.data.title,
        slug: getArticle.data.slug,
        date: getArticle.data.date,
        body: getArticle.data.body,
        footnotes: getArticle.data.footnotes,
        categories: getArticle.data.categories,
        tags: getArticle.data.tags
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(articleNode))
        .digest(`hex`);
    articleNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(articleNode);
    // });

    return;
}