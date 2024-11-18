function AboutPage() {
   return (
       <div>
           <p>
               Hello, my name is Michael Gregory, and I'm a software engineer based in San Antonio, Texas.
               I created this website to showcase my skills and to eventually serve as a practical personal blog 
               platform for myself, friends, and family members. Below, I’ve included project details and GitHub 
               links so you can explore the code. I've enjoyed working on this project so far and plan to add blog 
               entries soon to share my software engineering journey.
           </p>

           <p>
               <strong>Code repositories:</strong><br />
               Front end: <a href="https://github.com/skyrenx/ghost-blog" target="_blank" rel="noopener noreferrer">
                   https://github.com/skyrenx/ghost-blog
               </a><br />
               API: <a href="https://github.com/skyrenx/blog-api" target="_blank" rel="noopener noreferrer">
                   https://github.com/skyrenx/blog-api
               </a>
           </p>

           <p>
               <strong>Connect with me:</strong><br />
               LinkedIn: <a href="https://www.linkedin.com/in/michael-gregory-38b839b1" target="_blank" rel="noopener noreferrer">
                   Michael Gregory
               </a>
           </p>

           <h1>Features</h1>
           <ul>
               <li>Home page displaying the newest blog entry.</li>
               <li>Search page providing links to all blog entries.</li>
               <li>User login with role-based privileges for creating blog entries.</li>
               <li>Responsive navigation bar for both small and large screen widths.</li>
               <li>Input validation, HTTPS, and JWT authorization.</li>
               <li>Custom domain support.</li>
           </ul>

           <h2>Planned Features</h2>
           <p>These are listed roughly in order of priority:</p>
           <ul>
               <li>Use AWS api gateway for rate limiting, DDOS protection, monitoring, and other benefits</li>
               <li>User registration.</li>
               <li>Search filters for the search page.</li>
               <li>General UI improvements to enhance aesthetics.</li>
               <li>Ability to delete and edit blog entries.</li>
               <li>Commenting functionality for blog posts.</li>
           </ul>

           <h1>Technologies Used</h1>

           <h2>API</h2>
           <ul>
               <li>Java Spring Boot 3.</li>
               <li>Maven for dependency management.</li>
               <li>HTTPS and JWT for secure communication and authorization.</li>
               <li>JPA/Hibernate for database interactions.</li>
               <li>Spring Boot Data REST for paginated and sortable database access.</li>
               <li>Deployed in an AWS Lightsail container.</li>
               <li>AWS Lightsail managed SSL certificate.</li>
           </ul>

           <h2>Database</h2>
           <ul>
               <li>MySQL database hosted on AWS Lightsail.</li>
           </ul>

           <h2>Front End</h2>
           <ul>
               <li>React with NPM for dependency management.</li>
               <li>Deployed using AWS Amplify.</li>
               <li>AWS Amplify managed SSL certificate.</li>
           </ul>

           <h2>Development and Deployment Tools</h2>
           <ul>
               <li>AWS Route 53 for DNS configuration and routing to custom domains.</li>
               <li>VS Code, Docker, Postman, Git, and Github.</li>
           </ul>
       </div>
   );
}

export default AboutPage;
