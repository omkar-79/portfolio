export const sampleFolders = [
  {
    id: '1',
    name: 'React Development',
    files: [
      {
        id: '1-1',
        name: 'hooks-overview.md',
        content: `# React Hooks Overview

## useState
- Manages component state
- Returns current state and setter function
- Triggers re-render when state changes

## useEffect
- Handles side effects in functional components
- Runs after every render by default
- Can be controlled with dependency array

## useContext
- Provides way to pass data through component tree
- Avoids prop drilling
- Creates global state for component tree

## useRef
- Persists values between renders
- Doesn't trigger re-render when changed
- Commonly used for DOM references

## Custom Hooks
- Extract component logic into reusable functions
- Must start with "use"
- Can use other hooks inside custom hooks`,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '1-2',
        name: 'performance-tips.md',
        content: `# React Performance Tips

## 1. Use React.memo
- Prevents unnecessary re-renders
- Only re-renders when props change
- Good for expensive components

## 2. useMemo and useCallback
- Memoize expensive calculations
- Prevent child re-renders
- Cache function references

## 3. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports
- Reduce initial bundle size

## 4. Virtual Scrolling
- For large lists
- Only render visible items
- Use libraries like react-window

## 5. Bundle Analysis
- Use webpack-bundle-analyzer
- Identify large dependencies
- Optimize imports`,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      }
    ]
  },
  {
    id: '2',
    name: 'Python Development',
    files: [
      {
        id: '2-1',
        name: 'fastapi-basics.md',
        content: `# FastAPI Basics

## Installation
\`\`\`bash
pip install fastapi uvicorn
\`\`\`

## Basic Setup
\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
\`\`\`

## Path Parameters
\`\`\`python
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
\`\`\`

## Query Parameters
\`\`\`python
@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
\`\`\`

## Request Body
\`\`\`python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/")
def create_item(item: Item):
    return item
\`\`\``,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      }
    ]
  },
  {
    id: '3',
    name: 'System Design',
    files: [
      {
        id: '3-1',
        name: 'scalability-patterns.md',
        content: `# Scalability Patterns

## 1. Load Balancing
- Distribute traffic across multiple servers
- Types: Round Robin, Least Connections, IP Hash
- Health checks for server monitoring

## 2. Caching
- Redis for session storage
- CDN for static content
- Application-level caching
- Database query caching

## 3. Database Scaling
- Read Replicas for read-heavy workloads
- Sharding for horizontal scaling
- Connection pooling
- Database indexing strategies

## 4. Microservices
- Service decomposition
- API Gateway pattern
- Service discovery
- Circuit breaker pattern

## 5. Message Queues
- Asynchronous processing
- Decouple services
- Handle traffic spikes
- Examples: RabbitMQ, Apache Kafka`,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10')
      }
    ]
  }
]; 