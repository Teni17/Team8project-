
Inventory Tracking System


Project summary:

A food bank inventory tracking system application for Acme Corp, tracking the kind, quantity, and expiration dates of donated goods.

This application has been requested by Acme Corp to fulfill various needs. Primarily, to track their food bank inventory as mentioned above. However, the application must also be able to pull data from multiple different entities that store inventory information. In order for Acme to create it's various reports, data from these entities must be compiled. The application will also possess a robust security system, including an accounts-based log-in system, two-factor authentication, and TLS encryption for deployment. These features combine to create the application in its entirety. The MERN tech stack will be used for development.


Installation:

Prerequisites:
Must have installed git, MongoDB, Express JS, React+Vite JS, and Node JS

Backend Add-Ons:
cors - for frontend and backend communication
dotenv - for process.env values
pdfkit - for pdf generation
bcryptjs - for password encryption
jsonwebtoken - for user authentication

Frontend Add-Ons:
react-dom - for root configuration
react-router-dom - for browser routing and configuration
date-fns - for date formatting

Installation Steps:
1. Download code
2. Bundle install the above add-ons
3. node server.js to run the backend
4. npm run dev to run the frontend


Functionality: 
Once the application is installed, there are a few things you can do.
Firstly, the user must log in/sign up. A username and password will be associated with your account. Use these credentials to log in.
A user can add food items and update the inventory in-app. Choose the "Add Donation" option and input the information. Click Submit to add it.
A user can generate a report containing information about the current inventory. Choose the "Generate Report" option and download the file.
A user can view, filter, and search the inventory. Choose the "View Inventory" option and select desired filter/search options.

Known Problems: 
Some items in the inventory were added before we made a Schema change, so when downloading a report, some values will be undefined.
This is expected, and it only occurs for the older donations. All newer donations will properly display.
At the end of development all old donations will be deleted.

Contributing:
1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push --set-upstream origin my-new-feature
5. Submit a pull request :D

Additional Documentation - Sprint Reports
- Sprint 1 Report (05/06/24 - 05/31/2024):

What's New (User Facing)

Project setup, we as a team have set up the project by following a tutorial on project setup. 
This will allow us to start production on our app, and we can start to implement features.

Work Summary (Developer Facing)

As a team we have worked through all of the assignments assigned in class, keeping us on track of our
development. To accomplish these assignments as a team we communicate through discord and divide the
work evenly to make it easier, fair and efficient. We then reconvene, to check for errors and other discrepancies
before we submit. Now we are on the part of starting development we are going to be accomplishing this
by working together as a team to identify features we want to add and dividing up the work.

Completed Issues/User Stories

Here are links to the issues that we completed in this sprint:

- URL of Issue 1:
https://github.com/Teni17/Team8project-/issues/1
- URL of Issue 2:
https://github.com/Teni17/Team8project-/issues/2
- URL of Issue 3:
https://github.com/Teni17/Team8project-/issues/3

(We need to make smaller issues next time).

First completed Issue was project setup. We set up the frontend and backend of our project by following along to a tutorial video on youtube.
This was the video we used: https://www.youtube.com/watch?v=4nKWREmCvsE&t=432s

Sprint 1 Video: https://youtu.be/V5MC05DesTI

- Sprint 2 Report (06/01/2024 - 06/28/2024):
  What's New (User Facing)
  We added a View Inventory Page - which allows users to see all the donations made
  On this Page we have a Home Button which takes you to the Home Page which doesn't have anything on it currently but in the future will have a login/register. We also have a filter which will filter the donations and we have a search Bar to search through the donations by donor name. We also added in the backend more attributes to the Donations schema. For Register and Login we added 2 Factor Authorization which will send you an email with a verification code. Which can be typed in. Lastly we added TLC encryption for added security.

  Unfinished Work (Developer Facing)
  We have a couple issues surrounding 2 factor authorization which can be worked out. We also need to add more css styling to make our application look much better and usable. We also need to Merge Register/Login to Main.

  Completed Issues/User Stories
  -https://github.com/Teni17/Team8project-/issues/24
  -https://github.com/Teni17/Team8project-/issues/23
  -https://github.com/Teni17/Team8project-/issues/21
  -https://github.com/Teni17/Team8project-/issues/18
  -https://github.com/Teni17/Team8project-/issues/16
  -https://github.com/Teni17/Team8project-/issues/13
  -https://github.com/Teni17/Team8project-/issues/12
  -https://github.com/Teni17/Team8project-/issues/11
  -https://github.com/Teni17/Team8project-/issues/10
  -https://github.com/Teni17/Team8project-/issues/9
  -https://github.com/Teni17/Team8project-/issues/8

  Incomplete Issues/User Stories
  -https://github.com/Teni17/Team8project-/issues/25
  Running into a couple of issues
  -https://github.com/Teni17/Team8project-/issues/22
  Haven't started
  -https://github.com/Teni17/Team8project-/issues/19
  A couple Issues almost done
  -https://github.com/Teni17/Team8project-/issues/17
  Haven't started

  Code Files for Review
  -https://github.com/Teni17/Team8project-.git
  -https://github.com/Teni17/Team8project-.git
  -https://github.com/Teni17/Team8project-.git
  -https://github.com/Teni17/Team8project-.git
  -https://github.com/Teni17/Team8project-.git
  -https://github.com/Teni17/Team8project-.git

  Retrospective Summary
  
  Here's What went well
  -We added most all features we wanted to
  -We got back on track
  -We worked well as a team

  What we would like to improve
  -CSS styling
  -Deployment
  -Fixing bugs

  Changes
  -Make it look better
  -Deploy
  -Update any mistakes or update functionality

  
- Sprint 3 Report (06/29/2024 - 07/26/2024):

License:
[LICENSE.txt](https://github.com/Teni17/Team8project-/files/15476089/LICENSE.txt)

Sprint 2 video: https://youtu.be/SSYL9LWAKTI
