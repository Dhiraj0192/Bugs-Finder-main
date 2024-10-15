# Bug Finder System

![React](website-pics/home-page.png)

## Introduction
The **Bug Finder System** is a web-based application designed to assist users in identifying and resolving bugs in their code. The system leverages Large Language Models (LLMs), specifically Google Gemini, to analyze uploaded code, detect errors, and provide actionable debugging insights. It is designed for developers of all skill levels, offering an efficient, automated debugging process to reduce time spent on identifying and fixing coding errors.


## Features
- **User-Friendly Interface**: Easy-to-navigate platform where users can upload their code for analysis.
- **Automated Bug Detection**: Integration with Google Gemini API for advanced code diagnostics.
- **Multiple Language Support**: Supports debugging for languages such as Python, C++, JavaScript, Java, and C.
- **Cheat Sheets**: Learning resources for various programming languages to assist novice developers.
- **Detailed Reporting**: Generates and saves comprehensive bug reports for the submitted code.
- **Real-Time Feedback**: Provides real-time suggestions for code fixes.

## Technologies Used
### Frontend:
 ![React](https://badge.ttsalpha.com/api?icon=React&label=React&status=Froentend) ![CSS](https://badge.ttsalpha.com/api?icon=css3&label=CSS&status=Froentend&color=yellow&iconColor=yellow) - : - Builds dynamic and responsive user interfaces.

### Backend:
![Djando](https://badge.ttsalpha.com/api?icon=django&label=Djando&status=Backend&color=green&iconColor=green) - : - Manages the backend, handling user requests and data flow.

![Gemini API](https://badge.ttsalpha.com/api?icon=google&label=GeminiAPI&status=Backend&color=green&iconColor=green) - : - Used for code analysis and debugging.

### Database:
![MySql](https://badge.ttsalpha.com/api?icon=mysql&label=MySql&status=Database&color=blue&iconColor=green) - : - Stores user code submissions and debugging reports.

## Installation
1. **Clone the repository**:

    ```bash
    git clone https://github.com/Dhiraj0192/Bugs-Finder-main.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd bug-finder-system
    ```
3. **Set up the backend**:
    - Navigate to the project backend directory:
     
      ```bash
      cd bugsfinder
      ```
    - Install requirements.txt :
     
      ```bash
      pip install -r requirements.txt
      ```
    - Set up the database:
      ```bash
      python manage.py migrate
      ```
4. **Set up the frontend**:
    - Navigate to the project froentend directory:
     
      ```bash
      cd frontend
      ```
    - Ensure Node.js is installed.
    - Install the necessary React dependencies:
      ```bash
      npm install
      ```

5. **Run the project**:
    - Start the Django backend:
      ```bash
      python manage.py runserver
      ```
    - Start the React frontend:
      ```bash
      npm start
      ```

## Usage
1. **Sign Up/Sign In**: Users need to create an account or log in.
2. **Upload Code**: Users can upload their code for analysis via the platform.
3. **Code Analysis**: The system runs code diagnostics using the Google Gemini API and generates detailed reports.
4. **View Reports**: Users can view and download reports with suggestions on bug fixes.
5. **Cheat Sheets**: Access cheat sheets for supported programming languages to help with coding best practices.

## Screenshots

### Landing-Page
<img src="website-pics/signup-page.png" alt="project-screenshot" width="90%" height="100%"/>

### Home-Page 
<img src="website-pics/landing-page.png" alt="project-screenshot" width="90%" height="100%"/>

### FindBug-Page 
<img src="website-pics/findBug-page.png" alt="project-screenshot" width="90%" height="100%"/>

### RunCode-Section(FindBug-Page) 
<img src="website-pics/runcode.png" alt="project-screenshot" width="90%" height="100%"/>

### AnalyseCode-Page 
<img src="website-pics/analyseCode-page.png" alt="project-screenshot" width="90%" height="100%"/>

### AnalyseCode-Page 
<img src="website-pics/analyseCode-page.png" alt="project-screenshot" width="90%" height="100%"/>

### Report-Page 
<img src="website-pics/reports-page.png" alt="project-screenshot" width="90%" height="100%"/>

### CheatSheet-Page 
<img src="website-pics/cheat-sheet-page.png" alt="project-screenshot" width="90%" height="100%"/>

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
This README file provides a comprehensive overview of the Bug Finder System project, including details on installation, usage, features, and.
