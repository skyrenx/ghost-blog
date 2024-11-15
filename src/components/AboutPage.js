

function AboutPage() {
    return (
        <div>
         <p>
            Idea: summarize the totality of posts from individual X accounts, so you can catch up or learn about someone's posts quickly.
         </p>
            <p>This site was created with React, React-Quill, Spring Boot, and MySQL. 
            The Spring Boot REST service and MySQL database are hosted on Amazon Lightsail containers. 
            The React front end is hosted using Amazon S3 and CloudFront to ensure scalability and fast content delivery.</p>
            <p>
            Here’s a concise to-do list for setting up automated updates of the latest blog entry to S3 for faster loading:

1. **Set Up Backend Script**:
   - Write a backend script (e.g., in Node.js, Python, or as a Spring Boot job) that queries the MySQL database for the latest blog entry.
   - Format this entry as a JSON or HTML file.

2. **Automate with Serverless or Cron Job**:
   - Use AWS Lambda with a scheduled trigger or set up a cron job to run the script periodically (e.g., every hour or daily).

3. **Upload to S3**:
   - Configure the script to upload the JSON/HTML file to a specified S3 bucket, overwriting the previous file with the latest content.

4. **Integrate with CloudFront**:
   - Configure CloudFront to cache and serve the latest file from S3.
   - Optionally, set up cache invalidation to refresh the CloudFront cache immediately after each upload, ensuring fresh content on the homepage.

5. **Update React Front End**:
   - Modify the homepage to pull the latest blog entry directly from S3 (using CloudFront’s URL) instead of waiting for a database call.

Following these steps will enable you to serve the latest blog entry from S3, ensuring faster load times for visitors.        
            </p>

        </div>
    )
}

export default AboutPage