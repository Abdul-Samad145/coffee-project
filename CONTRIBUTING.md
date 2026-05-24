# Contributing to Artisan Coffee Collection

Thank you for your interest in contributing to the Artisan Coffee Collection! This document provides guidelines and instructions for contributing to this project.

##  Ways to Contribute

There are many ways you can contribute to this project:

- Report bugs - Found a bug? Let us know!
- Suggest features - Have an idea? We'd love to hear it!
- Design improvements - Better UI/UX ideas welcome
- Documentation - Help improve our docs
- Code contributions - Submit pull requests
- Testing- Help test new features
- Translations : Add multi-language support

##  Getting Started

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor or IDE (VS Code, Sublime Text, etc.)
- Git for version control

### Setting Up Your Development Environment

1. Fork the repository
   - Click the "Fork" button at the top right of the repository page
   - This creates a copy of the repository in your GitHub account

2. Clone your fork
   ```bash
   git clone https://github.com/YOUR-USERNAME/coffee-project.git
   cd coffee-project
   ```

3. Create a branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Open the project**
   - Simply open `index.html` in your browser
   - No build process required!

## 📋 Contribution Guidelines

### Code Style

#### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Add meaningful `id` and `class` names
- Include ARIA labels for accessibility
- Keep markup clean and readable

```html
<!-- Good -->
<button class="btn-primary" aria-label="Add new coffee">
    Add Coffee
</button>

<!-- Avoid -->
<div onclick="addCoffee()">Add</div>
```

#### CSS
- Use CSS custom properties for theming
- Follow BEM naming convention where appropriate
- Group related styles together
- Add comments for complex sections
- Maintain mobile-first responsive design

```css
/* Good */
.coffee-card {
    background: var(--bg-secondary);
    border-radius: 16px;
    transition: all 0.3s ease;
}

/* Avoid */
.card {
    background: #fff;
    border-radius: 16px;
}
```

#### JavaScript
- Use ES6+ features
- Follow camelCase naming convention
- Add JSDoc comments for functions
- Keep functions small and focused
- Use meaningful variable names
- Avoid global variables

```javascript
// Good
/**
 * Filters coffees by roast type
 * @param {Array} coffees - Array of coffee objects
 * @param {string} roastType - Type of roast to filter
 * @returns {Array} Filtered coffee array
 */
function filterByRoast(coffees, roastType) {
    return coffees.filter(coffee => coffee.roast === roastType);
}

// Avoid
function filter(c, r) {
    return c.filter(x => x.roast === r);
}
```

### Commit Messages

Follow the conventional commits specification:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(theme): add midnight theme option
fix(search): resolve case sensitivity issue
docs(readme): update installation instructions
style(css): improve button hover effects
```

### Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the code style guidelines
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template
   - Submit the PR

### Pull Request Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] Tested accessibility

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design maintained
```

## 🎨 Adding New Features

### Adding a New Theme

1. **Define CSS variables** in `style.css`:
```css
.theme-yourtheme {
    --primary: #your-color;
    --primary-dark: #your-dark-color;
    --primary-light: #your-light-color;
    --bg-primary: #your-bg;
    --bg-secondary: #your-secondary-bg;
    --text-primary: #your-text;
    --text-secondary: #your-secondary-text;
    --border: #your-border;
}
```

2. **Add theme button** in `index.html`:
```html
<button class="theme-preset" data-theme="yourtheme" title="Your Theme">
    <span class="preset-colors">
        <span style="background: #color1"></span>
        <span style="background: #color2"></span>
        <span style="background: #color3"></span>
    </span>
    Your Theme
</button>
```

3. **Test the theme** across all components

### Adding New Coffee Properties

1. **Update data structure** in `main.js`:
```javascript
const newCoffee = {
    id: 15,
    name: 'New Coffee',
    roast: 'medium',
    origin: 'Colombia',
    notes: 'Chocolate, Nutty',
    rating: 4.5,
    yourNewProperty: 'value' // Add here
};
```

2. **Update card rendering**:
```javascript
function createCoffeeCard(coffee) {
    // Add your new property display
    ${coffee.yourNewProperty ? `<p>${coffee.yourNewProperty}</p>` : ''}
}
```

3. **Update form** in `index.html`:
```html
<div class="form-group">
    <label for="yourNewProperty">Your Property</label>
    <input type="text" id="yourNewProperty" class="form-input">
</div>
```

4. **Update form submission** in `main.js`:
```javascript
const newCoffee = {
    // ... existing properties
    yourNewProperty: document.getElementById('yourNewProperty').value
};
```

## 🐛 Reporting Bugs

### Before Reporting
- Check if the bug has already been reported
- Try to reproduce the bug
- Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g., Chrome 90]
- OS: [e.g., Windows 10]
- Screen size: [e.g., 1920x1080]

**Additional context**
Any other relevant information.
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Mockups, examples, or other relevant information.

**Would you like to implement this feature?**
- [ ] Yes, I'd like to implement it
- [ ] No, just suggesting
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

- [ ] **Functionality**
  - [ ] Search works correctly
  - [ ] Filters apply properly
  - [ ] Sorting functions correctly
  - [ ] Add coffee form works
  - [ ] Delete confirmation works
  - [ ] Favorites toggle works
  - [ ] Modal opens and closes
  - [ ] Theme switching works
  - [ ] LocalStorage persists data

- [ ] **Responsive Design**
  - [ ] Mobile (320px - 767px)
  - [ ] Tablet (768px - 1023px)
  - [ ] Desktop (1024px+)
  - [ ] Large screens (1920px+)

- [ ] **Browser Compatibility**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **Accessibility**
  - [ ] Keyboard navigation works
  - [ ] Focus indicators visible
  - [ ] ARIA labels present
  - [ ] Color contrast sufficient
  - [ ] Screen reader friendly

- [ ] **Performance**
  - [ ] No console errors
  - [ ] Smooth animations
  - [ ] Fast load time
  - [ ] Efficient rendering

## 📚 Resources

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)

### Design Resources
- [Coolors](https://coolors.co/) - Color palette generator
- [Google Fonts](https://fonts.google.com/) - Free fonts
- [Heroicons](https://heroicons.com/) - Free SVG icons
- [Dribbble](https://dribbble.com/) - Design inspiration

### Tools
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [WebAIM](https://webaim.org/) - Accessibility checker
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

### Communication

- Be clear and concise
- Ask questions if unsure
- Share knowledge and resources
- Celebrate contributions
- Give credit where due

## 📞 Getting Help

If you need help:

1. **Check the documentation** - README.md and code comments
2. **Search existing issues** - Someone may have had the same question
3. **Ask in discussions** - Start a discussion thread
4. **Open an issue** - For bugs or feature requests

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Credited in commit history
- Part of an amazing community!

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to Artisan Coffee Collection! ☕**

*Every contribution, no matter how small, makes a difference!*
