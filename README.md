# Customer Data Table

This project provides a web application where you can view and interact with customer data. The application consists of a **ReactJS** frontend and a **FastAPI** backend, which communicate to display customer data retrieved from a PostgreSQL database. It supports the following features:

- **Show/Hide Columns**: Users can show or hide specific columns based on their preference.
- **Column Filters**: Filters can be applied to columns for better data searchability.
- **Infinite Scrolling**: Data is fetched seamlessly as the user scrolls down the table.

## Technologies Used

- **Frontend**: ReactJS, Axios, React Table, React Infinite Scroll
- **Backend**: FastAPI
- **Database**: PostgreSQL

## Setup Instructions

### 1. Clone the repository

Clone this repository to your local machine:

# for Backend setup

```bash
git clone https://github.com/NityanandaBehera/salieabs.git
cd backend
```
2. Create a virtual environment:

   ```
   python3 -m venv venv
   venv\Scripts\activate

   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   cd salieabs_backend
   ```
4. Database setup
   ```
   create  a .env
   DATABASE_URL=postgresql://username:root@localhost/db-name
   ```
    
5.run the server
  ```
  uvicorn main:app --reload
  ```
# for Frontend setup
```
cd frontend
cd salieabs_frontend
```
1. node modules installation
   ```
   npm install
   ```
2. run frontend
   ```
   npm run dev
   ```
