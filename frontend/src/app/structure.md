## Folder Structure Explanation

### Simple component structure:
This structure is designed for straightforward features that do not require nesting. **The folder structure can be expanded to contain new members if found necessary.**

- **components**: Contains local components that are created to represent a certain section of a page.

- **feature**: Groups together local and global components to form a visual representation of a page.

- **services**: In this folder, you'll find services related to the feature, such as data fetching.


### Nested component structure:

This folder structure is designed for scenarios in which a particular feature necessitates nesting. It serves as a container for organizing related sets of features.

#### Example:

- **home/**
  - *about*
  - *terms-conditions*
  - *privacy-policy*

The folders within nested features fulfill the same organizational role as those found within a simple feature folder.

**This structure can be expanded as needed to accommodate specific features.**

### Shared folder

The "Shared" folder contains code that can be shared and used across the application.

- **components**: Contains reusable components intended for use by different features.
  - Example: Header, Navbar

- **directives**: Used to contain reusable directives that can be applied to different parts of the application.
  - Example: Validation Forms

- **models**: Holds interfaces and concrete class implementations.
  - Example: UserModel

- **pipes**: Used to store data manipulation functions.
  - Example: Converting YYYY/MM/DD date format to DD/MM/YYYY format.

- **services**: Houses services and their implementations.
  - Example: Authentication Service

- **guards**: Contains Angular guards used to protect routes by implementing checks on specific routes.
