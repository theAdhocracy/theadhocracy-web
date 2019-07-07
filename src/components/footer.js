import React from 'react'

export default (props) => {

    // Creating Human Era Year
    const today = new Date
    const yearAD = today.getFullYear()
    const yearHE = (yearAD + 10000).toString().replace(/^([0-9][0-9])/, "$1,")

    return (
        <footer id="footer">
            <section>
                <h1>Made By Me, But Made Possible By:</h1>
                <p>CMS: <a href="https://craftcms.com/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/craft-logo.svg" alt="Craft CMS" /></a></p>
                <p>Build: <a href="https://www.gatsbyjs.org/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/gatsby-logo.svg" alt="Gatsby" /></a></p>
                <p>Deployment: <a href="https://github.com/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/github-logo.svg" alt="GitHub" /></a></p>
                <p>Hosting: <a href="https://www.netlify.com/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/netlify-logo.svg" alt="Netlify" /></a></p>
            </section>
            <section>
                <h1>Connect With Me:</h1>
                <p>Twitter <a href="https://twitter.com/theadhocracy"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/twitter-logo.svg" alt="Twitter" /></a></p>
                <p>Instagram <a href="https://instagram.com/theadhocracy"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/instagram-logo.svg" alt="Instragram" /></a></p>
                <p>500px <a href="https://500px.com/theadhocracy"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/500px-logo.svg" alt="500px" /></a></p>
                <p>GitHub <a href="https://github.com/theadhocracy"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/github-logo.svg" alt="GitHub" /></a></p>
            </section>
            {/* RSS Section to go here */}
            <p className="copyright"><a href="https://www.youtube.com/watch?v=czgOWmtGVGs">&copy; {yearHE} HE</a></p>
        </footer>
    )
}