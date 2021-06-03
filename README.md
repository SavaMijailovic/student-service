# Student service - faculty project

## :package: Installation
:exclamation: Requirements: Node.js (npm), MongoDB (server must be runned)

1. Clone repository somewhere on your machine

    ```sh
    git clone https://github.com/SavaMijailovic/student-service.git

    ```
    ```sh
    cd student-service
    ```
2. Install packages

    ```sh
    npm install

    ```
3. Import data into database

    ```sh
    mongoimport --db Faculty --collection students --file data/students.json
    ```
    ```sh
    mongoimport --db Faculty --collection exams --file data/exams.json
    ```

4. Start app

    ```sh
    node server.js

    ```

5. In your browser type next url [http://localhost:8168](http://localhost:8168)