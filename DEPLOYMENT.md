# Deployment Instructions

## 🚀 Current Status

All code has been committed and pushed to the feature branch: `claude/context-engineering-game-cKtbc`

## 📋 What's Been Built

### ✅ Complete Application
- Interactive Context Engineering Game
- 3 educational scenarios (Customer Service, Financial Analysis, Code Review)
- Drag-and-drop interface for context composition
- Real-time metrics and AI feedback
- Fully responsive design with Anthropic color scheme

### ✅ Testing Infrastructure
- Playwright E2E test suite (15+ tests)
- Automated screenshot capture
- Test coverage for all major features

### ✅ CI/CD Pipeline
- GitHub Actions workflow configured
- Automatic build and test on push
- Deployment to GitHub Pages on main branch merge

## 🔄 Next Steps to Deploy

### Option 1: Create Pull Request (Recommended)

1. Go to: https://github.com/sripathikrishnan/context-engineering-game/pull/new/claude/context-engineering-game-cKtbc

2. Create a pull request from `claude/context-engineering-game-cKtbc` to `main`

3. Once merged, GitHub Actions will automatically:
   - Install dependencies
   - Build the application
   - Run Playwright tests
   - Deploy to GitHub Pages

### Option 2: Merge via Command Line (If you have permissions)

```bash
# Switch to main branch
git checkout main

# Merge feature branch
git merge claude/context-engineering-game-cKtbc

# Push to main (will trigger deployment)
git push origin main
```

## 🌐 Accessing the Deployed Site

Once deployed to GitHub Pages, the site will be available at:

**https://sripathikrishnan.github.io/context-engineering-game/**

## 🔧 GitHub Pages Configuration

After merging to main, you may need to configure GitHub Pages:

1. Go to repository Settings
2. Navigate to "Pages" section
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
4. Save and wait a few minutes for deployment

## 🧪 Running Tests Locally

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Build the app
npm run build

# Run tests (requires preview server)
npm run preview &
npm run test:e2e
```

## 📊 Verifying Deployment

After deployment, verify these features work:

- [ ] All 3 scenarios load correctly
- [ ] Drag and drop functionality works
- [ ] Clicking items adds them to context
- [ ] Metrics update in real-time
- [ ] Feedback appears when adding items
- [ ] Remove button works in context window
- [ ] Responsive design on mobile/tablet

## 🐛 Troubleshooting

### Build fails in GitHub Actions

Check the Actions tab for detailed error logs. Common issues:
- Node version mismatch (should be 20)
- Missing dependencies
- TypeScript errors

### Playwright tests fail

Tests may fail on first run if:
- Preview server isn't ready (action has retry logic)
- Viewport size differs from expected
- Network timeout issues

### GitHub Pages not updating

- Check if gh-pages branch exists
- Verify GitHub Actions workflow completed successfully
- Clear browser cache
- Wait 5-10 minutes for GitHub Pages to update

## 📝 Files to Review

Key files created:
- `src/App.tsx` - Main application component
- `src/components/` - All UI components
- `src/data/tasks.ts` - Scenario definitions
- `src/utils.ts` - Metrics and feedback logic
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `tests/game.spec.ts` - E2E tests

## 🎓 Using the Tool for Training

Once deployed, instructors can:

1. Open the live site
2. Select a scenario
3. Ask participants to design optimal context
4. Discuss the metrics and feedback
5. Compare different approaches

The tool provides immediate visual feedback, making it perfect for interactive learning sessions.

## 📈 Future Enhancements

Potential improvements:
- Export context configurations as JSON/code
- Share configurations via URL parameters
- More scenarios (research, creative writing, etc.)
- Integration with actual Claude API for live testing
- Leaderboard/scoring system
- Mobile-optimized drag-and-drop
