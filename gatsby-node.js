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

    const fetchJournals = () => axios.get(`https://cms.theadhocracy.co.uk/journals.json`);
    const getJournals = await fetchJournals();

    const fetchNotes = () => axios.get(`https://cms.theadhocracy.co.uk/notes.json`);
    const getNotes = await fetchNotes();

    // Map feed and create nodes
    getFeed.data.data.map((post, i) => {
        // Create node object
        const postsNode = {
            // Required fields for Gatsby
            id: `${i}`,
            parent: `__SOURCE__`,
            internal: {
                type: `Posts`, // name of the graphQL query --> allPosts {}
            },
            children: [],
            // Fields specific to this endpoint
            entryId: post.id,
            title: post.title,
            slug: post.slug,
            date: post.date,
            month: post.month,
            year: post.year,
            snippet: post.snippet,
            categories: post.categories,
            tags: post.tags,
            contentType: post.type
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

    // Map articles and create nodes
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
            updated: article.updated,
            body: article.body,
            snippet: article.snippet,
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

    // Map journals and create nodes
    getJournals.data.data.map((journal, i) => {
        // Create node object
        const journalsNode = {
            // Required fields for Gatsby
            id: `${i}`,
            parent: `__SOURCE__`,
            internal: {
                type: `Journals`, // name of the graphQL query --> allJournals {}
            },
            children: [],
            // Fields specific to this endpoint
            entryId: journal.id,
            title: journal.title,
            slug: journal.slug,
            date: journal.date,
            updated: journal.updated,
            weekday: journal.weekday,
            day: journal.day,
            month: journal.month,
            year: journal.year,
            dateSuffix: journal.dateSuffix,
            body: journal.body,
            snippet: journal.snippet,
            footnotes: journal.footnotes,
            tags: journal.tags
        }

        // Get content digest of node. (Required field)
        const contentDigest = crypto
            .createHash(`md5`)
            .update(JSON.stringify(journalsNode))
            .digest(`hex`);
        journalsNode.internal.contentDigest = contentDigest;

        // Create node with the gatsby createNode() API
        createNode(journalsNode);
    });

    // Map notes and create nodes
    getNotes.data.data.map((note, i) => {
        // Create node object
        const notesNode = {
            // Required fields for Gatsby
            id: `${i}`,
            parent: `__SOURCE__`,
            internal: {
                type: `Notes`, // name of the graphQL query --> allNotes {}
            },
            children: [],
            // Fields specific to this endpoint
            entryId: note.id,
            title: note.title,
            slug: note.slug,
            date: note.date,
            body: note.body,
            snippet: note.snippet,
            categories: note.categories,
            tags: note.tags,
            attribution: note.attribution,
            source: note.source,
            tweet: note.tweet
        }

        // Get content digest of node. (Required field)
        const contentDigest = crypto
            .createHash(`md5`)
            .update(JSON.stringify(notesNode))
            .digest(`hex`);
        notesNode.internal.contentDigest = contentDigest;

        // Create node with the gatsby createNode() API
        createNode(notesNode);
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
            allJournals {
                nodes {
                    slug
                    year
                    month
                }
            }
            allNotes {
                nodes {
                    slug
                }
            }
        }
    `
    ).then(result => {

        // Create articles
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

        // Create articles list page
        const posts = result.data.allArticle.nodes
        const postsPerPage = 12
        const numPages = Math.ceil(posts.length / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/articles` : `/articles/${i + 1}`,
                component: path.resolve("./src/templates/articles.js"),
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                },
            })
        })

        // Create journal entries
        result.data.allJournals.nodes.forEach(({ slug, year, month }) => {
            createPage({
                path: `/journal/${year}/${month.toLowerCase()}/${slug}`,
                component: path.resolve(`./src/templates/journal_entry.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: slug,
                },
            })
        })

        // Create journals list page
        const journals = result.data.allJournals.nodes
        const journalsPerPage = 12
        const numJournalPages = Math.ceil(journals.length / journalsPerPage)
        Array.from({ length: numJournalPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/journal` : `/journal/${i + 1}`,
                component: path.resolve("./src/templates/journal.js"),
                context: {
                    limit: journalsPerPage,
                    skip: i * journalsPerPage,
                    numJournalPages,
                    currentPage: i + 1,
                },
            })
        })

        // Create notes
        result.data.allNotes.nodes.forEach(({ slug }) => {
            createPage({
                path: `/notes/${slug}`,
                component: path.resolve(`./src/templates/note.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: slug,
                },
            })
        })

        // Create notes list page
        const notes = result.data.allNotes.nodes
        const notesPerPage = 12
        const numNotesPages = Math.ceil(notes.length / notesPerPage)
        Array.from({ length: numNotesPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/notes` : `/notes/${i + 1}`,
                component: path.resolve("./src/templates/notes.js"),
                context: {
                    limit: notesPerPage,
                    skip: i * notesPerPage,
                    numNotesPages,
                    currentPage: i + 1,
                },
            })
        })
    })
}