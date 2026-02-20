# Testing Patterns

**Analysis Date:** 2026-02-20

## Test Framework

**Runner:**
- None detected
- No test configuration files found (no jest.config.*, vitest.config.*, karma.conf.*)

**Assertion Library:**
- None detected

**Run Commands:**
- Not applicable - no test scripts in `package.json`

## Test File Organization

**Location:**
- No test files found

**Naming:**
- Not applicable

**Structure:**
- No test directory structure present

## Test Structure

**Suite Organization:**
Not applicable - no tests detected

**Patterns:**
No testing patterns established in codebase

## Mocking

**Framework:** 
Not applicable - no testing framework present

**Patterns:**
No mocking patterns detected

**What to Mock:**
No guidelines established

**What NOT to Mock:**
No guidelines established

## Fixtures and Factories

**Test Data:**
Not applicable - no test fixtures found

**Location:**
No fixture directory present

## Coverage

**Requirements:** 
No coverage tooling configured

**View Coverage:**
Not applicable

## Test Types

**Unit Tests:**
- Not implemented

**Integration Tests:**
- Not implemented

**E2E Tests:**
- Not implemented

## Common Patterns

**Async Testing:**
Not applicable

**Error Testing:**
Not applicable

## Testing Status Summary

This is a **static portfolio website** with no testing infrastructure in place. The codebase consists of:
- Static HTML pages (`index.html`, blog posts in `/posts/`)
- Single CSS file (`style.css`)
- Vanilla JavaScript embedded inline in HTML files
- JSON data file (`data/posts.json`)

**Current Testing Approach:**
- Manual browser testing (implied)
- No automated testing
- No CI/CD integration for quality checks

**If Testing Were to Be Added:**

Based on the codebase structure, appropriate testing would likely include:

1. **Visual Regression Testing:**
   - Tools: Playwright, Cypress, or BackstopJS
   - Test card flip animations, responsive breakpoints
   - Verify blog post rendering across devices

2. **JavaScript Unit Testing:**
   - Framework: Jest or Vitest
   - Test functions like `setSoftSkillsVisible()`, `toggleFlip()`, `loadBlogArticles()`
   - Mock `fetch()` calls to `data/posts.json`
   - Test event handlers and DOM manipulation

3. **Accessibility Testing:**
   - Tools: axe-core, pa11y
   - Verify ARIA attributes function correctly
   - Test keyboard navigation flows
   - Validate focus management

4. **Link and Asset Validation:**
   - Tools: html-proofer, broken-link-checker
   - Verify all hrefs resolve correctly
   - Check image paths exist
   - Validate external links (GitHub, LinkedIn, etc.)

5. **HTML/CSS Validation:**
   - W3C HTML validator
   - CSS validator
   - Lighthouse audit for performance and SEO

**Example Test Pattern (if implementing):**

```javascript
// Example for blog loading (Jest + jsdom)
describe('Blog Loading', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="blogArticles"></div>
    `;
    global.fetch = jest.fn();
  });

  test('loads and renders blog posts', async () => {
    const mockPosts = [
      {
        title: 'Test Post',
        excerpt: 'Test excerpt',
        date: '2026-01-01',
        tags: ['Test'],
        readTime: '5 min read',
        href: '/posts/test.html'
      }
    ];

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts
    });

    await loadBlogArticles();

    const container = document.getElementById('blogArticles');
    expect(container.children.length).toBe(1);
    expect(container.textContent).toContain('Test Post');
  });

  test('handles fetch errors gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await loadBlogArticles();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to load blog articles:',
      expect.any(Error)
    );
  });
});
```

**Recommended Testing Priority:**

If testing is added, prioritize in this order:
1. HTML/CSS validation (catches syntax errors)
2. Accessibility testing (ensures usability)
3. Link checking (prevents broken navigation)
4. JavaScript unit tests for interactive features
5. Visual regression for design consistency

---

*Testing analysis: 2026-02-20*
