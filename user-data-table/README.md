# User data table

Project: User data table.

## Project features:

- Implemented fetch and storage of fake user data in the Vue store, using fakeStoreApi
  (https://fakestoreapi.com/docs#user) for data retrieval and manipulation.
- Displayed results in table with CRUD functionality.
- All item modifications are displayed in modal.
- Implemented a confirmation modal for deleting users.
- Enabled sorting functionality for user data.
- Implement a quick search feature to filter user data, by e-mail address.

## Comments

- As the API Database cannot be modified, I update my local Database with the user actions.
- The app is accessibility compliant (a11y compliant). For future implementation: focus should be trapped inside active modal.
- Footer:
  - To optimize the performance, a SVG sprite could be added with all logos instead of having multiple files.
  - Added Germany's web address inside company logos.
- Phone number: I validate phone number only for US phone numbers.
- Suggestions:
  - Add a confirmation pop-up to confirm that the user was updated, added or deleted (Currently, this message is displayed in the console).
  - Check if the email already exists in the Database.
  - Add user data inside the Edit modal (id or current data inside the input elements), to know which user is been edited.
- Create a global modal component.
- Mobile version:
  - Sort data in select.
  - Display results in containers.

## Clone project.

Clone the project: `git clone https://github.com/manoovau/vue-projects/user-data-table.git`.
It includes all dependencies.

## Install package(s).

run `npm i` from the command line.

## Open project.

run script `npm run dev` in the command line.

## Access the project from the browser.

I deployed the project, feel free to visit:
[User data table](https://user-data-table-site.vercel.app/)
