# COP4331-Project1 Group 25

**Link: [www.paradisecontacts.club](http://www.paradisecontacts.club)**  

**Theme: Paradise Contacts**  

**Database:**  
**Table 1: Users**  
-ID (Int) (Primary Key)  
-Name  (Varchar 50)  
-Email  (Varchar 50)  
-Username  (Varchar 50)  
-Password  (Varchar 50)  

**Table 2: Contacts**  
-ID  (Int) (Primary Key)  
-UserID  (Int)  
-Name  (Varchar 50)  
-Address  (Varchar 50)  
-Phone  (Varchar 50)  
-Email  (Varchar 50)  
-DateCreated  (Date)  

**API Endpoints (for now):**  
-AddUser  
-Login  
-AddContact  
-EditContact  
-DeleteContact  
-SearchContact  
