# Contributing to Seer Info Summary

Thank you for your interest in contributing to Seer Info Summary! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Issues

- Use the GitHub issue tracker to report bugs or request features
- Search existing issues before creating new ones
- Provide clear and detailed descriptions
- Include steps to reproduce for bugs

### Development Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/seer-info-summary.git
   cd seer-info-summary
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set up development environment**
   ```bash
   # Backend setup
   cd backend
   npm install
   
   # Frontend setup
   cd ../frontend
   npm install
   ```

4. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

5. **Test your changes**
   ```bash
   # Test backend
   cd backend
   npm start
   
   # Test frontend
   cd frontend
   npm run dev
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "Add: your descriptive commit message"
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all checks pass

### Code Style Guidelines

#### Frontend
- Use Prettier for code formatting: `npm run format`
- Follow Vue 3 Composition API patterns
- Use TypeScript when possible
- Follow TailwindCSS utility-first approach

#### Backend
- Use consistent naming conventions
- Add JSDoc comments for functions
- Handle errors appropriately
- Use async/await for asynchronous operations

### Commit Message Format

Use clear and descriptive commit messages:

```
Type: Brief description

Detailed explanation if needed
```

Types:
- `Add:` New features
- `Fix:` Bug fixes
- `Update:` Changes to existing features
- `Docs:` Documentation updates
- `Style:` Code style changes
- `Refactor:` Code restructuring
- `Test:` Test additions or modifications

## Development Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (v4.4+)
- Git

### Environment Variables

Create `.env` files based on the examples provided:

#### Backend `.env`
```env
DB_HOST=127.0.0.1
DB_PORT=27017
DB_NAME=seerInfo
# Add other required variables
```

#### Frontend `.env.development`
```env
VITE_API_BASE_URL=http://localhost:3003/seer-api
```

## Testing

- Ensure existing functionality works
- Test new features thoroughly
- Check responsive design on different screen sizes
- Verify API endpoints work correctly

## Questions?

Feel free to open an issue for questions or join discussions in existing issues.

---

Thank you for contributing to Seer Info Summary! 🎮