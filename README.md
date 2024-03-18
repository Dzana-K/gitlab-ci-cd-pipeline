# GitLab CI/CD pipeline

This project focuses on implemeting CI/CD pipeline in GitLab.

To implement the CI/CD pipeline, we need a web application. For this purpose, I chose the PawAdopt application. To manage the code, I chose the GitLab platform, while I used the Render service for deployment. 
GitLab serves as the source code control tool and enables the setup and automation of the CI/CD pipeline, while Render provides efficient and easy hosting of the application in the cloud.

For **CI**, I implemented two stages: the build stage and the test stage. 
In the **test stage**, I used tools such as flake8 for **lint testing**, which generates HTML with results, pytest for **testing endpoints**, **SAST** using SonarCloud, which redirects us to the SonarCloud page with results.
SonarCloud performs various tests, such as searching for security vulnerabilities, code analysis based on best practices, and more. Additionally, for the backend, I also used the **Snyk** tool to test the vulnerabilities of the used packages. Snyk examines the libraries used for potential security risks, including checking for known vulnerabilities in libraries and providing recommendations for their resolution. 

For the frontend, I performed **eslint tests** to check the correctness of the code, unit tests using **Jasmine/Karma** frameworks to test individual components and functions, and E2E tests using **Cypress** to verify the operation of the application as a whole. I also conducted an analysis of security vulnerabilities and code using SonarCloud and Snyk tools for the frontend. 

After merging the code into the main branch and deploying it to the staging environment, a **DAST** (Dynamic Application Security Testing) analysis is performed using the ZAP tool. This process allows us to be informed about any issues early in the development cycle, fix errors, and ensure the safe and efficient operation of the application.

For **CD**, I implemented two stages: **deployment to the test environment** (deploy staging) and **deployment to the production environment* (deploy production). When a developer completes their feature branch and merges the changes into the main branch, the process of deploying the code to the test environment is triggered. This environment allows thorough testing to ensure that all changes are successfully integrated before we release them for broader use. 
If the developers are satisfied with the test results in the test environment, they have the option to manually trigger the deployment process to the production environment. 
This ensures control over the process and verification that all changes are tested and approved before being sent to production.

Picture underneath shows all the jobs implemented for this project
![image](https://github.com/Dzana-K/gitlab-ci-cd-pipeline/assets/124843892/0c3bd8a5-c834-46c7-a369-5321b57b16d9)
