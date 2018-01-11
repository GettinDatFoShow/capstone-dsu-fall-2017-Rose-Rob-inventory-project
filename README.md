# capstone-dsu-fall-2017-Rose-Rob-inventory-project
capstone-dsu-fall-2017-Rose-Rob-inventory-project
**Progressive Asset Management**

Authors: Robert Morris and Roshitha Vallurupalli

Advisor: Dr. Marwan Rasamny

Delaware State University CIS Capstone Project Spring 2017

![image alt text](image_0.png)

# Introduction

Today’s mobile technology has brought us the ability to ease the lives of everyone. Although we have this ability, we must first identify the problematic systems in need of repair. The Progressive Asset Management application improves the quality of data, reduces time spent on management, and raises the participation level of its users. 

#### **Statement of Problem**

Delaware State University’s current asset management is a system struggling in several ways. With error prone manual data entry points, cluttered paper trails, time consuming inventory audits, and a low level of participation, the banner system is a hardship to those who use and maintain it. 

**Background**

The current system consists of three major components. 

1. The Inventory Entry Point (asset management) : 

    1. items arrive and are unpacked and cataloged on paper and given a barcode

    2. They are entered into RCI (DSU maintained inventory system)

    3. Then are also entered into the Banner inventory system (Banner is an Ellucian product, which is managed by DSU)

    4. Information is sent to finance and the inventory is sent to its designation

2. Inventory auditing

    5. During the year the inventory is supposed to be tracked and maintained for government tax purposes. 

    6. Each time an item is moved, devalued,  or no longer deemed useful the Department Chairs whom are in change of the designated inventory in their department are to fill out a paper request which is then sent down to asset management for approval and to be entered into the system/s. 

3. Item order approval or payment tracking is done by finance

    7. Once the item is paid, Finance notifies asset management 

    8. Then item is updated in Banner System/ RCI

Notes:

* It is recommended by Ellucian that the Items are currently up to date and that inventory audits are done on at least a partial amount of items in each department monthly. To ease the burden of large audits if the items are not currently up to date.

* Only items over 5000 dollars in value are required by law to be kept track of. This is the main purpose of Banner (The are considered fixed assets).

* The school maintains inventory for items under 5000 dollars in the RCI system only (not considered fixed assets). 

* Purpose of the audits is to update the fixed asset conditions to accommodate for the depreciation of the item. 

#### **Objectives**

Our goal in designing the Progressive Asset Management system was to create a cross platform  progressive web application that was mobile first driven. This would ensure an easier to maintain single code base that can be used by smartphones as well as desktops. Research provided by Pew Research Center1 states that as of January of 2017, 77% of U.S. adults owned a smart-phone, 51% owned a tablet, and 88% use the internet. More research provided by Statista2 shows that of the people who purchased or owned a smartphone by June 2017 consisted of 53.3% Android platform users and 44.9% Apple iOS users. With this research in mind, designing an application that could run natively on all platforms was our main goal. This would lead the a higher participation level by the asset management’s users and a current up-to-date audit system. 

#### **Plan of Action**

Our plan of action was in dealing with * main points:

1. Data Storage & Retrieval

    1. Portable

    2. Versatile 

    3. Easily Configurable

    4. Modular

We used H2 database to store data to and retrieve data from. 

2. Handling Data Requests

    5. Quick & Reliable

    6. Easily configured

    7. Provide Error Handling

We used rest services to map data requests.

3. UX Design

    8. Automatic Device Sizing

    9. Platform Detection

    10. Single Page Applications

    11. Server Issue Code Base

We used ionic native for frontend user design. We also used cordova plugins to use technology like geolocation, camera and QR Scanner. It’s a progressive application which means we used the same code to launch the application in all platforms.

4. Native Device Access

5. Overall Ease of Use

![image alt text](image_1.png)

#### **Management Plan**

We used lot of resources to keep track of our progress and to communicate with each other in the duration of the project.

* Waffle board: project management

    * We used Waffle board to create and keep track of issues and tasks that we had to tackle in the presentation.

* GitHub: version control

    * Once we resolved the issues or finished the tasks we pushed our code into our Github repositories.

    * Github and Waffle board are interlinked so all the changes made in Github were stored in Waffle board. 

* Slack: communication

    * we also used Slack as a communication channel for our project, to communicate about project issues and set up weekly meeting.

    * Slack is also interlinked with Waffle board so any changes made in Waffle board were notified to us through our slack channel.

#### **Conclusion**

After getting through a lot of obstacles we were able to implement some interesting features into our project and reach our goal. We were able to add a database model in the backend and map the backend to the front end. We also accomplished to have all the important frontend tasks like setting up the component, data sharing between pages. Creating and editing items and rooms. We also had cordova plugins like geolocation, QR Scanners, camera etc., We had to face some issues with installing android platform and some permissions but we worked together to figure it out.

**Useful links related to project**

* Github: [https://github.com/GettinDatFoShow/capstone-dsu-fall-2017-Rose-Rob-inventory-project.git](https://github.com/GettinDatFoShow/capstone-dsu-fall-2017-Rose-Rob-inventory-project.git)

* Google slides (presentation): [https://docs.google.com/presentation/d/1NTe3Ktm_1Z_l-BFEh_i9btzoUs0L_rUCrqvXViZNKEk/edit?usp=sharing](https://docs.google.com/presentation/d/1NTe3Ktm_1Z_l-BFEh_i9btzoUs0L_rUCrqvXViZNKEk/edit?usp=sharing)

#### **References**

* [https://ionicframework.com/docs/native/](https://ionicframework.com/docs/native/)

* [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

* [http://hibernate.org/orm/](http://hibernate.org/orm/)

* [https://angular.io/](https://angular.io/)
