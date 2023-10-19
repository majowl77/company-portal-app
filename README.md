# Redux Assignment

This assignment will be completed using Redux Toolkit

## APIs

- All companies: GET `https://api.github.com/organizations`
- One company: GET `https://api.github.com/orgs/<id or login>`

### Level 1: Basic Requirements

Using Redux create actions to fetch APIs for:

- Get all companies
- Get a single company by ID

- Store the data in the Redux store. In the state, there should be attributes for an array of items, loading, and error.
- Handle cases such as request, success, and failure.
  - Show the loading state (using a Loading component or simple text) when loading is true.
  - Display an error message if there is any error while fetching data.

This assignment will be completed in TypeScript, so remember to define types for variables, constants, actions, and props.

### Level 2: Additional Requirements

Add a feature to search by name (company name).

### Level 3: Bonus requirements (Optional)

If you have a higher skill level and finish the previous requirements before the deadline, you can tackle the following bonus tasks:

- Implement the sort feature.
- Peer review:
- Review the code and implementation of 2 assignments from other participants.
- Provide constructive feedback and suggestions for improvement.

`Please note that the bonus requirements and reviews are optional and can be completed if you have additional time and advanced skills.`

Happy coding!
