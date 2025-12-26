# Context Engineering Game

An interactive educational tool to teach engineers the art and science of designing optimal context for AI agents. Based on [Anthropic's context engineering framework](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

## 🎯 Overview

This game helps developers understand the critical tradeoffs involved in context engineering for AI agents through hands-on experimentation with different scenarios.

### Key Learning Objectives

- Understand context optimization techniques (compaction, note-taking, memory files)
- Learn when to use tools for dynamic context vs. pre-loaded content
- Experience the tradeoffs between latency, cost, and accuracy
- Discover caching strategies for improved performance
- Practice designing context for different use cases

## 🎮 Features

### Three Interactive Scenarios

1. **Real-time Customer Service** - Optimize for low latency (<2s response times)
2. **Financial Analysis** - Balance accuracy with cost for long-running analysis
3. **Code Review Assistant** - Handle large codebases efficiently

### Intelligent Feedback System

The game provides real-time AI-powered feedback:
- ⚠️ **Warnings** - Identify potential issues with your context configuration
- 💡 **Insights** - Positive reinforcement for good practices
- ✨ **Tips** - Suggestions for optimization
- ⚖️ **Tradeoff Analysis** - Understanding the implications of your choices

### Real-time Metrics

Track the impact of your context choices:
- **Tokens** - Monitor context window usage
- **Cost** - Estimated API costs
- **Latency** - Expected response times
- **Cache Rate** - Optimization through caching
- **Accuracy** - Estimated quality of results

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run E2E tests
npm run test:e2e
```

### Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## 🏗️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling with custom color palette
- **@dnd-kit** - Drag and drop functionality
- **Zustand** - State management
- **Playwright** - E2E testing

## 🎨 Design

The color scheme is based on Anthropic's visual design:
- **Blue** (#A8C5E8) - System prompts, instructions, domain knowledge
- **Teal** (#8FD4C1) - Documents
- **Orange** (#F4A582) - Tools
- **Purple** (#C7B8E8) - Memory files
- **Gray** (#E5E5E5) - Message history
- **Cream** (#F5F3F0) - Background

## 📚 Educational Use

This tool is designed for **instructor-led training sessions**. Instructors can:

1. Introduce a scenario and its requirements
2. Have participants design their own context
3. Discuss the tradeoffs shown in the metrics
4. Review AI-generated feedback together
5. Compare different approaches

## 🔗 Learn More

- [Anthropic: Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Design Document](DESIGN.md)

## 📄 License

ISC

## 🙏 Acknowledgments

Built with ❤️ based on Anthropic's research on context engineering for AI agents.
