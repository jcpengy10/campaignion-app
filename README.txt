Campaignion

Welcome to Adobe Campaignion! 

Background: 
This React application helps technical consultants in Adobe Campaign Standard
accomplish two tasks: 1) standardize documentation of workflows and 2) document workflows 
easily and quickly. With 1), previous documentation of workflows existed in the form of 
outlines or screenshots of the workflow accompanied by tables that broke down each activity
and its purpose. This application standardizes the latter method by first generating a 
numbered diagram of the entire workflow, then dividing the activities into "break out diagrams" 
and tables that explain each group of activities' name, purpose, and additional notes. With 2), 
all previous methods of documenting workflows involved manually creating templates and/or labeling 
activities. This application automates those processes by already labeling the activities and auto-
filling activity descriptions with starter template language for you.

To use: 
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