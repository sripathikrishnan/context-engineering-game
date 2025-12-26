# Context Engineering Game - Design Document

## Overview
An interactive educational tool to teach engineers the art and science of context engineering for AI agents. Based on Anthropic's context engineering framework.

## Educational Objectives
1. Expose engineers to context engineering tradeoffs
2. Demonstrate various optimization techniques
3. Provide hands-on experience with real-world scenarios
4. Enable instructor-led training sessions

## Core Concepts (from Anthropic Research)

### Key Principles
- **Context is finite and critical** - Every token must attend to every other token
- **Context rot** - Simply increasing context doesn't guarantee better performance
- **High-signal token selection** - Keep context informative yet tight
- **54% performance improvement** - Achievable through proper context engineering

### Techniques to Demonstrate
1. **Tools for additional context** - Dynamic context via tool calls
2. **Message compaction** - Summarizing and condensing information
3. **Note-taking** - Structured memory for key facts
4. **Subset agents** - Parallel processing for independent tasks
5. **Pre-computed vs JIT context** - Memory files vs tool calls
6. **Tradeoffs** - Latency vs cost vs accuracy
7. **Caching optimization** - Token caching strategies

## Game Architecture

### UI Layout (Based on Reference Image)

```
+------------------------------------------------------------------+
|                     Context Engineering Game                      |
+------------------------------------------------------------------+
|  Task Selector: [Customer Service] [Financial Analysis] [...]    |
+------------------------------------------------------------------+
|                                                                   |
|  +-------------------------+  +-------------------------------+  |
|  | Available Items         |  | Context Window                |  |
|  | (Universe/Palette)      |  | (Current Selection)           |  |
|  |                         |  |                               |  |
|  | [Doc] [Doc] [Doc]       |  | Drag items here               |  |
|  | [Tool] [Tool] [Tool]    |  |                               |  |
|  | [Memory file] [...]     |  | [System prompt]               |  |
|  | [Instructions]          |  | [Doc 1] [Tool 1]              |  |
|  | [Domain knowledge]      |  | [User message]                |  |
|  | [Message history]       |  |                               |  |
|  |                         |  |                               |  |
|  +-------------------------+  +-------------------------------+  |
|                                                                   |
+------------------------------------------------------------------+
|  Metrics Panel                                                    |
|  Tokens: 1,234 / 200,000  |  Cost: $0.12  |  Latency: ~2.3s     |
|  Cached: 60%              |  Accuracy: 85% (estimated)          |
+------------------------------------------------------------------+
|  AI Feedback & Analysis                                          |
|  "Your context includes too many tools that overlap in           |
|   functionality. Consider consolidating to reduce ambiguity..."   |
+------------------------------------------------------------------+
```

### Color Scheme (from Reference Image)
- **Background:** `#F5F3F0` (light beige/cream)
- **System/Instructions (Blue):** `#A8C5E8`
- **Documents (Teal):** `#8FD4C1`
- **Tools (Orange):** `#F4A582`
- **Memory Files (Purple):** `#C7B8E8`
- **Message History (Gray):** `#E5E5E5`
- **Text:** `#2C2C2C` (dark gray/black)

### Task Scenarios

#### 1. Real-time Customer Service Agent
**Context:**
- Company policy documents (50KB each)
- Product catalog (100KB)
- FAQ database (200KB)
- User profile tools
- Order management tools
- Knowledge base search tool

**Challenges:**
- Need fast response times (<2s)
- Must maintain conversation history
- Balance between comprehensive knowledge and speed
- Caching opportunities for static content

**Optimal Strategy:**
- Use memory files for condensed policies
- Tool calls for JIT product lookups
- Cache static system instructions
- Message compaction for long conversations

#### 2. Financial Analysis Agent (Long-running)
**Context:**
- Market data (real-time)
- Historical trends (100MB+)
- Regulatory documents
- Portfolio analysis tools
- Risk calculation tools
- Reporting tools

**Challenges:**
- Cost optimization for long analysis
- Accuracy is paramount
- Can tolerate higher latency
- Massive data universe

**Optimal Strategy:**
- Pre-computed summaries in memory files
- Subset agents for parallel analysis
- Selective tool usage
- Focus on accuracy over speed

#### 3. Code Review Assistant
**Context:**
- Codebase files (variable size)
- Linting rules
- Style guides
- PR description
- Diff tools
- Git history tools

**Challenges:**
- Large code files
- Need comprehensive understanding
- Balance depth vs breadth
- Caching unchanged files

**Optimal Strategy:**
- Selective file inclusion
- Compacted message history
- Cached style guides
- Tool-based git operations

## Interactive Features

### 1. Drag & Drop Interface
- Drag items from "Available Items" to "Context Window"
- Drag to reorder within context window
- Drag to remove (trash icon or back to palette)
- Visual feedback during drag operations

### 2. Item Inspection
- Click to view full content
- Edit capabilities for custom scenarios
- Token count per item
- Cacheability indicator

### 3. Real-time Metrics
- **Token Usage:** Running total / max context window
- **Estimated Cost:** Based on input/output tokens
- **Estimated Latency:** Based on token count and tool calls
- **Cache Hit Rate:** Percentage of cacheable tokens
- **Accuracy Score:** Heuristic based on context quality

### 4. AI Feedback System
The game provides intelligent feedback on context choices:

**Feedback Categories:**
1. **Efficiency Warnings**
   - "Too many overlapping tools - creates decision ambiguity"
   - "Large documents could be summarized into memory files"
   - "Consider using tools for JIT data instead of pre-loading"

2. **Performance Insights**
   - "High cache hit rate - good for cost optimization!"
   - "Context size may cause latency issues for real-time use"
   - "Missing critical domain knowledge for this task"

3. **Best Practice Tips**
   - "System prompt is cacheable - place it first for better caching"
   - "Consider subset agents for these independent tasks"
   - "Message compaction could reduce tokens by ~40%"

4. **Tradeoff Analysis**
   - "Current config: High accuracy, high cost, medium latency"
   - "Removing these docs would save $X but reduce accuracy by Y%"
   - "Adding this tool enables dynamic context at runtime"

### 5. Comparison View
- Save multiple context configurations
- Side-by-side comparison
- Diff view showing changes
- Metrics comparison table

### 6. Scenario Builder (Advanced)
- Instructors can create custom scenarios
- Define universe of available items
- Set optimal ranges for metrics
- Create custom feedback rules

## Technical Implementation

### Tech Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Drag & Drop:** @dnd-kit/core
- **State Management:** Zustand or React Context
- **Testing:** Playwright
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions

### Data Models

```typescript
// Item types in the universe
type ItemType = 'system_prompt' | 'user_message' | 'doc' | 'tool' |
                'memory_file' | 'instructions' | 'domain_knowledge' |
                'message_history';

interface ContextItem {
  id: string;
  type: ItemType;
  name: string;
  description: string;
  content: string;
  tokenCount: number;
  cacheable: boolean;
  color: string; // Hex color based on type
}

interface Task {
  id: string;
  name: string;
  description: string;
  category: 'realtime' | 'longrunning' | 'batch';
  availableItems: ContextItem[];
  optimalConfig?: {
    tokenRange: [number, number];
    cacheRateMin: number;
    requiredItems: string[]; // IDs of must-have items
  };
}

interface ContextWindow {
  items: ContextItem[];
  metrics: {
    totalTokens: number;
    estimatedCost: number;
    estimatedLatency: number;
    cacheHitRate: number;
    accuracyScore: number;
  };
}

interface Feedback {
  type: 'warning' | 'insight' | 'tip' | 'tradeoff';
  message: string;
  severity: 'low' | 'medium' | 'high';
  relatedItems?: string[]; // Item IDs
}
```

### Key Components

1. **TaskSelector** - Choose scenario
2. **ItemPalette** - Universe of available items
3. **ContextWindow** - Current selection with drag target
4. **ItemCard** - Individual draggable item
5. **MetricsPanel** - Real-time metrics display
6. **FeedbackPanel** - AI-generated feedback
7. **InspectorModal** - Detail view for items
8. **ComparisonView** - Side-by-side configs

### Feedback Generation Logic

```typescript
function generateFeedback(context: ContextWindow, task: Task): Feedback[] {
  const feedback: Feedback[] = [];

  // Check for tool overlap
  const tools = context.items.filter(i => i.type === 'tool');
  if (tools.length > 5) {
    feedback.push({
      type: 'warning',
      message: 'Too many tools may create decision ambiguity',
      severity: 'medium',
      relatedItems: tools.map(t => t.id)
    });
  }

  // Check token efficiency
  if (context.metrics.totalTokens > 100000) {
    feedback.push({
      type: 'tip',
      message: 'Consider message compaction or memory files to reduce tokens',
      severity: 'medium'
    });
  }

  // Check caching
  if (context.metrics.cacheHitRate > 0.7) {
    feedback.push({
      type: 'insight',
      message: 'Excellent cache utilization! This will reduce costs.',
      severity: 'low'
    });
  }

  // Task-specific checks
  if (task.category === 'realtime' && context.metrics.estimatedLatency > 3) {
    feedback.push({
      type: 'warning',
      message: 'High latency for real-time use case. Consider reducing context size.',
      severity: 'high'
    });
  }

  return feedback;
}
```

## Deployment Strategy

### GitHub Pages
1. Build static site to `dist/` directory
2. Deploy to `gh-pages` branch
3. Configure custom domain if needed
4. Enable HTTPS

### GitHub Actions Workflow
```yaml
name: Test and Deploy

on:
  push:
    branches: [main, claude/*]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Run Playwright tests
      - Take screenshots
      - Upload artifacts

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - Build production site
      - Deploy to GitHub Pages
```

### Testing Strategy
1. **Unit Tests:** Component logic
2. **Integration Tests:** Drag & drop, state management
3. **E2E Tests (Playwright):**
   - Load each scenario
   - Drag items to context window
   - Verify metrics update
   - Capture screenshots
   - Test feedback generation
   - Compare visual regressions

## Success Metrics

### Educational Effectiveness
- Engineers can identify 5+ context optimization techniques
- Can explain tradeoffs between latency/cost/accuracy
- Can design appropriate context for different scenarios

### Tool Usability
- Intuitive drag & drop (user testing)
- Clear visual feedback
- Actionable AI suggestions
- Fast performance (<100ms UI updates)

## Future Enhancements
1. Export context configurations as code
2. Import real Anthropic API responses
3. Multiplayer mode (team training)
4. Advanced analytics dashboard
5. Integration with actual Claude API for live testing
6. More scenarios (research, creative writing, etc.)
7. Gamification (scores, achievements)

## References
- [Anthropic: Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- Reference Image: faa261102e46c7f090a2402a49000ffae18c5dd6-2292x1290.webp
