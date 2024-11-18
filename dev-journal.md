# Development Journal for `ghost-blog`

## Project Overview
The `ghost-blog` project is an ongoing effort to create a dynamic, feature-rich personal blog platform for myself. Below is a timeline of commits, detailing the progress and features implemented during the development process.

---

### **Commits on Nov 14, 2024**
- **First production version deployed and functoinal**: Using AWS amplify at <https://blog.michaelgregory.dev>

### **Commits on Nov 13, 2024**
- **HTTPS Implementation and CSRF Exemption**: Secured API communication by enforcing HTTPS.
- **Login/Logout Feature**: Added functionality for user authentication, including login and logout options.

### **Commits on Nov 6, 2024**
- **Updated Endpoint URI**: Prefixed `/public` to endpoint URIs not requiring authentication for clearer routing and security.

### **Commits on Nov 4, 2024**
- **Page Navigation on Search Page**: Introduced navigation features to improve usability on the search page.

### **Commits on Nov 3, 2024**
- **Search Page Updates**: Enhanced the search page functionality with better UI and responsiveness.

### **Commits on Nov 1, 2024**
- **CSS Enhancements and Dark Mode**: Improved visual appeal by refining CSS styles and adding a dark mode option. Added error messages for blog creation.

### **Commits on Oct 31, 2024**
- **Dynamic Blog Entry Navigation**: Added routes to access blog entries by ID, enabling navigation through blog titles on the homepage. Defaulted to loading the latest blog entry when no ID is specified.

### **Commits on Oct 30, 2024**
- **Project Structure Update**: Moved the root project directory to `js-michael` and removed unnecessary directories for better organization.

### **Commits on Oct 29, 2024**
- **Blog Post Management**: Enabled displaying blog posts on the homepage and writing new blog posts on a dedicated page. Input is sanitized before posting to the database.

### **Commits on Oct 23, 2024**
- **React-Quill Integration**: Added a rich text editor for writing blog entries on the Write page.

### **Commits on Oct 21, 2024**
- **Expanded Hamburger Menu**: Improved navigation by adding an expanded hamburger menu.

### **Commits on Oct 20, 2024**
- **Responsive Navigation Menu**: Developed an adaptively rendered navigation menu for various screen sizes.

### **Commits on Oct 17, 2024**
- **Navbar and Homepage Image**: Added a responsive navigation bar and a hero image to enhance the homepage.

### **Commits on Oct 16, 2024**
- **React Router Setup**: Introduced `react-router-dom` for client-side routing.
- **Changelog Added**: Created a CHANGELOG file to document development progress.
- **Initial Setup**: Committed the foundational setup of the project.

---
## Enhancements:
- **Security**: Consider if a CSP(Content Security Policy) would increase security. I think it wouldn't, because there is no third party content loaded on this site.

## Future features:
- **Implement Commenting Feature**: Enable users to comment on blog posts.
- **Hide write page from unauthorized users**: only admin role users should see the write page.
- **Performance Optimizations**: Measure and improve load times. Load latest blog entry from s3 static storage instead of backend API call to database.
- **Testing Coverage**: Increase automated testing for front-end and back-end components.
- **Images in blog posts**
- **Social media integration with blog posts** enable twitter/x, facebook, youtube embedded links within blog posts. 
---

