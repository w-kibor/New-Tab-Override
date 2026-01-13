# Inspired Tab: A Custom New Tab Experience

A beautiful, minimalist Chrome Extension that replaces the default "New Tab" page with a focused dashboard featuring a dark-mode aesthetic and real-time motivational quotes.

## Features

**Custom Override:** Replaces the standard Google New Tab page with a clean, distraction-free interface.

**Live Quotes:** Fetches fresh inspiration from a public API every time you open a new tab.

**Modern Design:** Uses a dark gradient background, modern typography, and Flexbox for perfect centering.

**Responsive:** Designed to look great on any screen size.

## Technical Overview

This project demonstrates key browser extension capabilities:

**Manifest V3:** Utilizing the latest Chrome Extension standards.

**URL Overrides:** Leveraging `chrome_url_overrides` to provide a custom start page.

**Asynchronous JS:** Implementing the fetch API with async/await to handle external data requests.

**Error Handling:** Fallback logic to display a default quote if the user is offline or the API fails.

## 📥 Installation

1. Download or clone this repository.

2. Navigate to `chrome://extensions/` in Google Chrome.

3. Enable **Developer mode** (top right).

4. Click **Load unpacked** and select the project folder.

5. **Important:** Open a new tab. When Chrome asks "Is this the page you were expecting?", click **Keep it**.

## Project Structure

- **manifest.json** - Configures the extension to override the newtab page.

- **newtab.html** - The structural layout of the dashboard.

- **style.css** - Custom styling for the dark-mode aesthetic.

- **script.js** - The logic for fetching and displaying quotes.

## Future Ideas

- [ ] Add a personal greeting based on the time of day (e.g., "Good morning!").

- [ ] Integrate a background image API like Unsplash.

- [ ] Add a simple "Top Sites" quick-link menu.
