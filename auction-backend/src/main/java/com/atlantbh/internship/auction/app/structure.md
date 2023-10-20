### Project Structure

- **builder** (optional): contains classes that implement the Builder design pattern.

- **config**: holds configuration files for customizing the application's behavior.
    - Example: Using the `@Bean` annotation and performing Dependency Injection.
      
  Will include constants.
- **controller**: contains classes that handle incoming HTTP requests and define RESTful endpoints.

- **dto**: contains Data Transfer Objects (DTOs). DTOs cab only contain a subset of the fields present in the
  corresponding entity. Additionally, DTOs may have different names for their fields compared to the corresponding
  entity.

- **entity**: contains entity classes that are mapped to database tables. These classes represent the core data
  structure of the application.

- **exception**: contains custom exception classes.

- **mapper**: holds classes that handle the mapping or conversion of data between different formats or structures.
    - Example: Mapping `UserEntity` to `UserDto`.

- **repository**: holds classes and interfaces responsible for communicating with the database. They are responsible for
  data access and persistence, without implementing any business logic.

- **service**: holds classes responsible for implementing the business logic of the application.
    - Example: Performing CRUD operations.
