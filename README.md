# Anime Library UI

## Overview
This project is a web-based UI for an animelib, designed to manage and display anime collections effectively. It provides detailed information about each anime, including synopsis, episodes, scores, and user-specific details. The UI is built with Angular and features a clean design (hopefully).

## Features
- **Multi-language support**: Translations are stored in JSON files, loaded dynamically per session.
- **Anime Details Page**: Displays synopsis, episode list, user scores, and related recommendations.
- **REST API Integration**: Fetches anime data from a backend API.

## Tech Stack
- **Frontend**: Angular
- **Styling**: SASS
- **Data Handling**: JSON-based storage with REST API communication
- **Hosting**: Designed for local use but adaptable for online deployment

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yukiisen/ani-interface.git
   cd ani-interface
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   ng serve
   ```
4. Open the UI in a browser at `http://localhost:4200/`

## Future Enhancements
- Finish the undone features.
- Implementing a light mode.
- Adding search and filtering capabilities.
- Improving user scores and preferences management.
- Creating a recommendation system.

## License
MIT License - Free to use and modify.
