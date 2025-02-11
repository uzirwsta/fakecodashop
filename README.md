# LootVault

LootVault is a web application designed to manage and track in-game items, loot, and inventory for gamers. Built using Django and React, LootVault provides a seamless experience for users to store, organize, and analyze their virtual assets.

## Features

- *User Authentication*: Secure login and registration system.
- *Loot Management*: Add, edit, and remove in-game items.
- *Categories & Tags*: Organize loot based on custom categories.
- *Search & Filter*: Easily find specific items using search and filters.
- *Real-Time Updates*: Automatically sync inventory changes.
- *Analytics Dashboard*: Track trends and stats for your items.
- *Responsive UI*: Optimized for both desktop and mobile devices.

## Tech Stack

- *Frontend*: React, Tailwind CSS
- *Backend*: Django, Django REST Framework
- *Database*: PostgreSQL / SQLite
- *Authentication*: Django Authentication, JWT
- *Hosting*: (Specify if deployed, e.g., AWS, Heroku)

## Installation

### Prerequisites

Ensure you have the following installed:

- Python 3.8+
- Node.js & npm
- PostgreSQL (or use SQLite for local development)

### Backend Setup

1. Clone the repository:

    
    git clone https://github.com/eayerishz/lootvault.git
    cd lootvault
    

2. Create a virtual environment and activate it:

    
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    

3. Install dependencies:

    
    pip install -r requirements.txt
    

4. Apply migrations and run the server:

    
    python manage.py migrate
    python manage.py runserver
    

### Frontend Setup

1. Navigate to the frontend directory:

    
    cd frontend
    

2. Install dependencies:

    
    npm install
    

3. Start the frontend server:

    
    npm start
    

## Usage

- Register or log in to access your inventory.
- Add new loot items and organize them into categories.
- View, edit, or delete items from your collection.
- Track trends using the analytics dashboard.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch:

    
    git checkout -b feature-name
    

3. Commit your changes and push:

    
    git commit -m "Description of changes"
    git push origin feature-name
    

4. Open a Pull Request.

## Contact

For questions or support, contact [mbmalig@student.hau.edu.ph].
