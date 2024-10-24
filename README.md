# Student service

## About

Web application that manages data about students and their exams.
I made it as a result of practicing for a faculty course.
App uses *ejs*, *express* and *mongoose* external packages.
Code is implemented using Model-View-Controller (MVC) architectural pattern and CommonJS formatting system.

## Install and Run

**Requirements: Node.js (npm), MongoDB (server must be runned)**

1. Clone the repository locally and navigate to the created directory:
    ```sh
    git clone https://github.com/SavaMijailovic/student-service.git
    cd student-service
    ```

2. Install packages:
    ```sh
    npm install
    ```

3. Import data into database:
    ```sh
    mongoimport --db Faculty --collection students --file data/students.json
    ```
    ```sh
    mongoimport --db Faculty --collection exams --file data/exams.json
    ```

4. Start server:
    ```sh
    node server.js
    ```

5. In browser open next url: [http://localhost:3000](http://localhost:3000)
