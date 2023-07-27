import React from "react";

const About = (props) => {
  return (
    <div className={`about-container ${props.theme?.name}`}>
      <h2>About Custom Theme Manager</h2>
      <p>
        The Custom Theme Manager is a web application that allows users to save
        their color theme preferences on a website. Users can find a menu in the
        header section of the website to choose the primary color theme from a
        list. Once the user selects a color theme, the website's primary color
        theme changes immediately to the selected one.
      </p>
      <p>
        The selected color preference is saved in the database using an API,
        ensuring that users can retrieve their preferences even when logging in
        from another browser, location, or tab. The application implements a
        JWT-based sign-in mechanism, and color preferences are included in the
        JWT payload for easy management.
      </p>
      <p>
        The tech stack used for this project includes React for the frontend,
        and Node.js with Express for the backend. Optional technologies like
        Material UI, Redux/Zustand, GraphQL, and TypeScript are also supported.
        The codebase will be organized, properly formatted, and free from any
        lint warnings or errors.
      </p>
      <p>
        The Custom Theme Manager will be deployed on Heroku or any other cloud
        service of choice, and the codebase will be available on GitHub for
        review.
      </p>
    </div>
  );
};

export default About;
