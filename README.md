# Task Management Frontend

A React-based task management application with GraphQL integration, featuring pagination.

## 🚀 Features

- **Task Management**: Create, read, update, and delete tasks
- **GraphQL Integration**: Efficient data fetching with Apollo Client
- **Pagination**: Handle large datasets with cursor-based pagination
- **Docker Support**: Containerized deployment ready

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0
- **State Management**: Apollo Client (GraphQL)
- **UI Framework**: React Bootstrap 2.10.10
- **Styling**: Bootstrap 5.3.8 + CSS Modules
- **Internationalization**: i18next + react-i18next
- **Routing**: React Router DOM 7.9.5
- **Build Tool**: Create React App (React Scripts 5.0.1)

## 📋 Prerequisites

- Node.js 18+ (recommended)
- npm or yarn package manager
- GraphQL API endpoint configured

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/amifaldu/task_management_system_frontend.git
   cd task-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   The application will be available at `http://localhost:3000`

### Docker Development

1. **Build Docker image**
   ```bash
   docker build -t task-management-frontend .
   ```
2. **Run container**
   ```bash
   docker run -p 3001:3001 task-management-frontend
   ```

   The application will be available at `http://localhost:3001`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── CreateTask.js    # Task creation form
│   ├── EditTask.js      # Task editing form
│   ├── ErrorBoundary.js # Error handling component
│   ├── Pagination.js    # Pagination controls
│   ├── StatusSelector.js # Status selection dropdown
│   ├── TaskForm.js      # Reusable task form
│   ├── TaskItem.js      # Individual task display
│   ├── TaskList.js      # Task list container
│   └── LoadingSpinner.js # Loading indicator
├── constants/           # Application constants
│   └── statusConstants.js # Task status definitions
├── graphql/            # GraphQL operations
│   ├── queries.js      # GraphQL queries
│   └── mutations.js    # GraphQL mutations
├── hooks/              # Custom React hooks
│   ├── useApolloCache.js    # Apollo cache utilities
│   ├── useErrorHandler.js   # Error handling hook
│   ├── usePagination.js     # Pagination logic
│   ├── useSuccessMessage.js # Success message handling
│   ├── useTaskActions.js    # Task CRUD operations
│   ├── useTaskForm.js       # Form state management
│   └── useTranslations.js   # i18n utilities
├── i18n/               # Internationalization
│   └── config.js       # i18next configuration
├── locales/            # Translation files
│   └── en/             # English translations
├── utils/              # Utility functions
│   └── statusUtils.js  # Status-related utilities
├── apollo/             # Apollo Client setup
│   └── client.js       # GraphQL client configuration
├── routes/             # Application routing
│   └── index.js        # Route definitions
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🔧 Configuration

### GraphQL Schema

The application expects a GraphQL schema with the following types:

```graphql
type Task {
  id: ID!
  title: String!
  description: String
  status: StatusEnum!
}

enum StatusEnum {
  TODO
  IN_PROGRESS
  COMPLETED
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type TaskEdge {
  node: Task!
  cursor: String!
}

type TaskConnection {
  edges: [TaskEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}
```


## 📊 Features in Detail

### Task Management
- **Create Tasks**: Add new tasks with title, description, and status
- **Edit Tasks**: Update existing task information
- **Delete Tasks**: Remove tasks with confirmation
- **Status Management**: Track task progress (Todo, In Progress, Completed)

### Pagination
- **Cursor-based Pagination**: Efficient for large datasets
- **Configurable Page Size**: Adjustable number of items per page
- **Navigation Controls**: Previous/Next buttons with page info

### Error Handling
- **Error Boundaries**: Catch and display React errors gracefully
- **API Error Handling**: User-friendly error messages for GraphQL errors
- **Form Validation**: Client-side validation with error feedback

## 🚀 Deployment

### Build Optimization

```bash
# Create optimized production build
npm run build
```

## 🚀 Author
Ami Faldu
