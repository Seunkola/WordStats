This project is a sample project that allows a user to enter some arbitrary sequence of characters and will
return a histogram of counts for each n-gram, displayed as a bar chart or
table of counts 

## WordStats App Architecture and Frameworks

In this project directory, the app was divided into two
<ul>
    <li>API/Server which was hosted on AWS lambda and deployed using API Gateway. API was written using Node.js and code can be found on project directory at: API/index.js</li>
    <li>Client-side/Frontend written in javascript using React.js framework and react-chartjs-2 for data visualization on a bar chart</li>
</ul>

### `Getting Started`

To have a feel of the app, you can view demo at <a href="">View Demo</a>. App features include:
<ul>
    <li>allow user inputs, update input and delete input</li>
    <li>Converts text into ngram and return no of counts</li>
    <li>Displays ngram and count on a tabular and chart format</li>
</ul>

### `Run Locally`

<ol>
    <li>Clone/Download app from github</li>
    <li>locate project directory on console '/Frontend/app'</li>
    <li>npm install</li>
    <li>npm start </li>
    <li>View app on <a href="http://localhost:3000/">http://localhost:3000/</a>
<ol>

### `Test`

No automated Test
