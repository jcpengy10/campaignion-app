Campaignion

Welcome to Adobe Campaignion! 

Background: 
This React application helps technical consultants in Adobe Campaign Standard 1) standardize documentation of workflows and 2) document workflows 
easily and quickly. With 1), previous documentation of workflows existed in the form of 
outlines or screenshots of the workflow accompanied by tables that broke down each activity
and its purpose. This application standardizes the latter method by first generating a 
numbered diagram of the entire workflow, then dividing the activities into "break out diagrams" 
and tables that explain each group of activities' name, purpose, and additional notes. With 2), 
all previous methods of documenting workflows involved manually creating templates and/or labeling 
activities. This application partially automates those processes by labeling the activities and generating
starter template language for activity descriptions.

To run this app via the terminal:
Make sure you have XCode and Homebrew installed. 
1. Install the latest version of node/npm (Check by running node -v and npm -v)
2. Run the following commands to install OpenWhisk and configure with API HOST and AUTH KEY: 
    brew update
    brew install wsk
    wsk -h (to validate)
    wsk property set --apihost APIHOST --auth AUTHKEY (APIHOST=https://adobeioruntime.net AUTHKEY=417ffec3-a191-4332-bffe-c3a191633235:rwdq7EGnpioOGrWl7lvNulKrXJ6T1xsDj5gYxnqkGXjEM99YSVFmBJUZKGi4S9VQ)
    wsk property get (to validate credentials)
3. Run the following commands to install the aio CLI: 
    npm install -g @adobe/aio-cli
    aio -h 
4. To run the app via local server 
    aio app run (app will run on 'localhost:9080' by default)

To use the app: 
- Go to the workflow in Google Chrome and open the developer console (View > Developer > Developer Tools OR Command+Option+C)
- Click anywhere in the empty space in the workflow area so that the 'svg' element shows up highlighted in the console (This holds all rendering code for the workflow)
- Right click that element in the console and select 'Edit as HTML'
- Command+A to select all the html code
- Copy and paste to the Campaignion text area and select the number of activities you'd like to see broken down at a time
- Hit 'Process'

Notes: 
- Activities in the workflow must be either enabled or paused to be displayed
- 'Start', 'End', 'Fork', and 'AND-join' activities are not labeled or explained in the tables

Tools: This application was built with React and Adobe I/O.
Last Deployed 5/3/2020.