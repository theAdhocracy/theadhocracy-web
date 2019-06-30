const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;

    // Fetch data from the input API endpoint
    const fetchPosts = () => axios.get(`https://cms.theadhocracy.co.uk/posts.json`);
    const res = await fetchPosts();

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
            title: post.title,
            slug: post.slug,
            date: post.date,
            snippet: post.snippet,
            categories: [post.categories],
            tags: [post.tags]
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

    return;
}