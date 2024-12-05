# Security Best Practices

1. **Authentication & Authorization**
   - Implement JWT-based authentication with secure token storage
   - Use attribute-based access control (ABAC) for authorization
   - Apply principle of least privilege
   - Implement session management and secure logout
   - Use refresh tokens with appropriate expiration
   ```typescript
   // Example security headers configuration
   {
     "Content-Security-Policy": "default-src 'self'",
     "Strict-Transport-Security": "max-age=31536000",
     "X-Content-Type-Options": "nosniff",
     "X-Frame-Options": "DENY",
     "X-XSS-Protection": "1; mode=block"
   }
   ```

2. **Data Protection**
   - Encrypt sensitive data in transit (HTTPS/TLS)
   - Sanitize all user inputs to prevent XSS attacks
   - Implement Content Security Policy (CSP)
   - Use HTTP security headers
   ```typescript
   // Example API request configuration
   const apiConfig = {
     timeout: 5000,
     withCredentials: true,
     headers: {
       "X-CSRF-TOKEN": csrfToken,
       "Content-Type": "application/json"
     }
   };
   ```

3. **API Security**
   - Validate all API requests
   - Rate limit API endpoints
   - Use CSRF tokens for state-changing operations
   - Implement request timeout
   - Secure error handling (no sensitive data in errors)
   ```typescript
   // Example API request configuration
   const apiConfig = {
     timeout: 5000,
     withCredentials: true,
     headers: {
       "X-CSRF-TOKEN": csrfToken,
       "Content-Type": "application/json"
     }
   };
   ```

4. **Dependencies & Build**
   - Regular security audits with `npm audit`
   - Keep dependencies updated
   - Use lockfiles (package-lock.json)
   - Implement SRI for external resources
   - Minimize attack surface in production builds
   ```json
   {
     "scripts": {
       "security-audit": "npm audit && npm audit fix",
       "dependencies-update": "npm update && npm audit fix"
     }
   }
   ```

5. **Environment Configuration**
   - Secure environment variables management
   - Different configurations per environment
   - No sensitive data in version control
   - Use secrets management for production
   ```typescript
   // Example environment validation
   const envSchema = z.object({
     API_URL: z.string().url(),
     JWT_SECRET: z.string().min(32),
     NODE_ENV: z.enum(["development", "production", "test"]),
     ENABLE_SECURITY_HEADERS: z.boolean()
   });
   ```

6. **Client-Side Security**
   - Implement secure storage strategies
   ```typescript
   // Secure storage utility
   export const secureStorage = {
     set: (key: string, value: unknown): void => {
       const encrypted = encrypt(JSON.stringify(value));
       sessionStorage.setItem(key, encrypted);
     },
     get: <T>(key: string): T | null => {
       const encrypted = sessionStorage.getItem(key);
       if (!encrypted) return null;
       return JSON.parse(decrypt(encrypted));
     }
   };
   ```
   - Clear sensitive data on logout
   - Implement proper CORS configuration
   - Use secure cookies with appropriate flags
   - Implement browser security features

7. **Security Monitoring**
   - Implement security logging
   - Monitor for suspicious activities
   - Set up error tracking
   - Regular security assessments
   ```typescript
   // Example security logger
   export const securityLogger = {
     warn: (event: string, context: object): void => {
       logger.warn({
         type: "SECURITY_WARNING",
         event,
         context,
         timestamp: new Date().toISOString()
       });
     },
     alert: (event: string, context: object): void => {
       logger.error({
         type: "SECURITY_ALERT",
         event,
         context,
         timestamp: new Date().toISOString()
       });
       // Alert security team
     }
   };
   ```

# Logging Strategy

1. **Log Levels & Objectives**
   - Use appropriate log levels consistently:
     ```typescript
     enum LogLevel {
       DEBUG = "debug",     // Detailed information for debugging
       INFO = "info",       // Notable business events
       WARN = "warn",       // Abnormal situations, potential issues
       ERROR = "error",     // Errors affecting specific operations
       FATAL = "fatal"      // Critical errors affecting the entire app
     }
     ```
   - Define clear logging objectives for each component/context
   - Establish KPIs for monitoring and alerting

2. **Structured Logging**
   - Use JSON format for machine-readable logs
   - Include essential context in every log entry:
     ```typescript
     interface LogEntry {
       timestamp: string;
       level: LogLevel;
       message: string;
       context: {
         requestId: string;
         userId?: string;
         service: string;
         environment: string;
         version: string;
         correlationId?: string;
       };
       metadata?: Record<string, unknown>;
     }
     ```

3. **Log Management**
   - Implement log rotation and retention policies
   - Configure log sampling for high-volume events
   - Use canonical log lines for request tracking:
     ```typescript
     // Example canonical log line
     {
       "timestamp": "2024-01-25T10:00:00.000Z",
       "request_id": "req_123",
       "method": "POST",
       "path": "/api/users",
       "user_id": "usr_456",
       "status": 201,
       "duration_ms": 150,
       "client_ip": "192.168.1.1",
       "user_agent": "Mozilla/5.0...",
       "error": null
     }
     ```

4. **Security & Privacy**
   - Never log sensitive data (passwords, tokens, PII)
   - Implement log obfuscation for sensitive fields
   - Secure log storage and transmission:
     ```typescript
     // Example log sanitizer
     function sanitizeLogData(data: unknown): unknown {
       const sensitiveFields = ["password", "token", "secret"];
       return deepRedact(data, sensitiveFields);
     }
     ```

5. **Performance Considerations**
   - Implement asynchronous logging
   - Use log buffering for high-throughput scenarios
   - Configure log sampling rates:
     ```typescript
     // Example sampling configuration
     const logSamplingConfig = {
       debug: 0.01,  // Sample 1% of debug logs
       info: 0.1,    // Sample 10% of info logs
       warn: 1,      // Log all warnings
       error: 1,     // Log all errors
       fatal: 1      // Log all fatal errors
     };
     ```

6. **Monitoring & Alerting**
   - Set up log-based alerts for critical events
   - Monitor logging system health
   - Implement log aggregation:
     ```typescript
     // Example log aggregator configuration
     const logAggregatorConfig = {
       batchSize: 100,
       flushInterval: 5000, // ms
       retryAttempts: 3,
       endpoints: {
         development: "http://localhost:9200",
         production: process.env.LOG_AGGREGATOR_URL
       }
     };
     ```

7. **Development & Debugging**
   - Include development-specific logging utilities
   - Implement request tracing:
     ```typescript
     // Example trace logger
     export const traceLogger = {
       startTrace: (operation: string): string => {
         const traceId = generateTraceId();
         logger.debug(`Starting ${operation}`, { traceId });
         return traceId;
       },
       endTrace: (traceId: string, operation: string): void => {
         logger.debug(`Completed ${operation}`, { traceId });
       }
     };
     ```

8. **Compliance & Auditing**
   - Maintain audit logs for sensitive operations
   - Implement log integrity verification
   - Ensure regulatory compliance:
     ```typescript
     // Example audit logger
     export const auditLogger = {
       logUserAction: (
         userId: string,
         action: string,
         resource: string
       ): void => {
         logger.info("User action", {
           type: "AUDIT",
           userId,
           action,
           resource,
           timestamp: new Date().toISOString()
         });
       }
     };
     ```

# Critically Important Rules

1. **Completeness**: Generate complete, functional code. If unable to provide full code, explain limitations with comments.
2. **Comments**: Include clear inline comments and **JSDoc** headers to describe each step, improving readability and maintainability.
3. **Error Checking**: Implement thorough error handling and **type validation** to ensure code reliability.
4. **Types**: Use strict TypeScript notation. Specifically:
    - Avoid using the `any` type.
    - Do not use the non-null assertion operator (`!`).
    - Avoid casting to `unknown` (e.g., `as unknown as T`).
5. **Strings**:
    - Use **double quotes** (`"`) for strings.
    - Prefer **template literals** or `.join()` over concatenation.

# Code Review Process

- Review code for performance, readability, and compliance with **best practices**.
- Ensure components and functions are optimized for both **performance** and **maintainability**.
- Check for unnecessary re-renders, and optimize using **VueUse** functions.
- Verify that lazy loading, optimized chunking, and image optimization techniques are consistently applied.

# AI Assistance Guidelines

1. **Code Generation Standards**
   - Ensure generated code follows Clean Architecture principles
   - Maintain consistent TypeScript types and interfaces
   - Include comprehensive error handling
   - Follow established project patterns and conventions
   ```typescript
   // Example of well-structured generated code
   interface UserInterface {
     id: string;
     email: string;
     profile: UserProfileInterface;
   }

   function createUser(data: CreateUserDTO): Result<UserInterface> {
     try {
       // Input validation
       const validatedData = userSchema.parse(data);

       // Business logic
       const user = UserFactory.create(validatedData);

       // Error handling
       return Result.ok(user);
     } catch (error) {
       logger.error("User creation failed", { error });
       return Result.fail("Failed to create user");
     }
   }
   ```

2. **Documentation Requirements**
   - Provide clear JSDoc comments for all functions and types
   - Include usage examples and edge cases
   - Document architectural decisions and trade-offs
   - Explain complex algorithms or business logic
   ```typescript
   /**
    * Creates a new user in the system
    * @param {CreateUserDTO} data - User creation data
    * @returns {Result<UserInterface>} Result containing the created user or error
    * @throws {ValidationError} When input data is invalid
    * @example
    * const result = await createUser({
    *   email: "user@example.com",
    *   password: "secure123"
    * });
    */
   ```

3. **Code Review Assistance**
   - Analyze code for potential issues and anti-patterns
   - Suggest performance optimizations
   - Check for security vulnerabilities
   - Verify architectural compliance
   ```typescript
   // Example of code review feedback
   // ❌ Anti-pattern: Direct repository access in component
   const users = userRepository.getUsers();

   // ✅ Recommended: Use application service
   const users = await userService.getUsers();
   ```

4. **Problem-Solving Approach**
   - Break down complex problems into smaller tasks
   - Provide multiple solution options with pros/cons
   - Consider performance, maintainability, and scalability
   - Follow iterative improvement process
   ```typescript
   // Example problem-solving steps
   // 1. Analyze requirements
   // 2. Propose solution alternatives
   // 3. Implement MVP solution
   // 4. Iterate and optimize
   ```

5. **Best Practices Enforcement**
   - Ensure SOLID principles compliance
   - Verify Clean Architecture layer separation
   - Check for proper dependency injection
   - Maintain consistent code style
   ```typescript
   // Example of layer separation
   // ✅ Domain Layer
   export class User extends AggregateRoot { }

   // ✅ Application Layer
   export class CreateUserUseCase implements UseCase { }

   // ✅ Infrastructure Layer
   export class UserRepository implements UserRepositoryInterface { }
   ```

6. **Testing Guidelines**
   - Generate comprehensive test cases
   - Cover edge cases and error scenarios
   - Follow TDD principles when applicable
   - Include performance and integration tests
   ```typescript
   // Example test structure
   describe("CreateUserUseCase", () => {
     it("should create user with valid data", async () => {});
     it("should handle validation errors", async () => {});
     it("should handle database errors", async () => {});
     it("should emit user created event", async () => {});
   });
   ```

7. **Performance Optimization**
   - Identify performance bottlenecks
   - Suggest optimization strategies
   - Consider resource usage and scalability
   - Measure performance impacts
   ```typescript
   // Example performance optimization
   // ❌ Inefficient: Multiple queries
   const user = await userRepo.findById(id);
   const profile = await profileRepo.findByUserId(id);

   // ✅ Optimized: Single query with join
   const userWithProfile = await userRepo.findByIdWithProfile(id);
   ```

8. **Error Handling & Logging**
   - Implement comprehensive error handling
   - Provide meaningful error messages
   - Include proper logging statements
   - Consider error recovery strategies
   ```typescript
   // Example error handling
   try {
     const result = await useCase.execute(command);
     if (result.isFailure) {
       logger.error("Operation failed", {
         error: result.error,
         context: command
       });
       // Handle failure
     }
   } catch (error) {
     // Handle unexpected errors
   }
   ```

9. **Security Considerations**
   - Review code for security vulnerabilities
   - Suggest security improvements
   - Ensure proper data validation
   - Implement security best practices
   ```typescript
   // Example security review
   // ❌ Unsafe: Direct SQL query
   const user = await query(`SELECT * FROM users WHERE id = ${id}`);

   // ✅ Safe: Parameterized query
   const user = await query("SELECT * FROM users WHERE id = ?", [id]);
   ```

10. **Maintenance & Scalability**
    - Consider long-term maintainability
    - Plan for future scalability
    - Document technical debt
    - Suggest refactoring opportunities
    ```typescript
    // Example maintainability improvement
    // ❌ Hard to maintain
    function processData(data: any) { /* ... */ }

    // ✅ Type-safe and maintainable
    interface DataProcessor<T> {
      process(data: T): Result<ProcessedData>;
    }
    ```

# Pure Functions Guidelines

1. **Core Principles**
   - No side effects (mutations externes)
   - Deterministic output (même entrée = même sortie)
   - No external state dependencies
   - No shared mutable state
   ```typescript
   // ❌ Impure function with side effects
   let total = 0;
   function addToTotal(value: number): number {
     total += value; // Side effect: modifies external state
     return total;
   }

   // ✅ Pure function
   function add(a: number, b: number): number {
     return a + b; // Deterministic, no side effects
   }
   ```

2. **Benefits**
   - **Testability**: Easy to test with simple input/output assertions
   - **Predictability**: Consistent behavior regardless of context
   - **Reusability**: Can be used safely anywhere
   - **Maintainability**: Easier to understand and modify
   ```typescript
   // Example of easily testable pure function
   function calculateTotal(items: Item[]): number {
     return items.reduce((sum, item) => sum + item.price, 0);
   }

   // Simple to test
   test("calculateTotal should sum item prices", () => {
     const items = [
       { price: 10 },
       { price: 20 }
     ];
     expect(calculateTotal(items)).toBe(30);
   });
   ```

3. **Composition Patterns**
   - Chain pure functions for complex operations
   - Use pipe/compose for functional composition
   - Keep functions small and focused
   ```typescript
   // Pure function composition
   const normalize = (text: string): string => text.trim().toLowerCase();
   const capitalize = (text: string): string =>
     text.charAt(0).toUpperCase() + text.slice(1);

   // Composed pure functions
   const formatName = (name: string): string =>
     pipe(normalize, capitalize)(name);
   ```

4. **State Management**
   - Return new state instead of mutating
   - Use immutable data structures
   - Implement pure reducers for state updates
   ```typescript
   // ❌ Impure state mutation
   function updateUser(user: User, data: Partial<User>): void {
     Object.assign(user, data); // Mutates original object
   }

   // ✅ Pure state update
   function updateUser(user: User, data: Partial<User>): User {
     return { ...user, ...data }; // Returns new object
   }
   ```

5. **Error Handling**
   - Use Result/Either types for error handling
   - Return error states instead of throwing
   - Keep error handling pure
   ```typescript
   // Pure error handling with Result type
   function divide(a: number, b: number): Result<number> {
     if (b === 0) {
       return Result.fail("Division by zero");
     }
     return Result.ok(a / b);
   }
   ```

6. **Performance Optimization**
   - Leverage function memoization
   - Use lazy evaluation when appropriate
   - Cache pure function results
   ```typescript
   // Memoized pure function
   const memoizedCalculation = memoize((x: number): number => {
     // Expensive computation
     return x * factorial(x);
   });
   ```

7. **Testing Strategies**
   - Unit test with different inputs
   - Property-based testing
   - Test edge cases thoroughly
   ```typescript
   describe("pure math functions", () => {
     test.each([
       [2, 3, 5],
       [0, 0, 0],
       [-1, 1, 0],
     ])("add(%i, %i) should return %i", (a, b, expected) => {
       expect(add(a, b)).toBe(expected);
     });
   });
   ```

8. **Integration with Vue**
   - Use pure computed properties
   - Separate pure business logic
   - Pure state transformations
   ```typescript
   // Pure computed property
   const total = computed((): number =>
     items.value.reduce((sum, item) =>
       add(sum, item.price), 0)
   );

   // Pure business logic
   function calculateDiscount(
     total: number,
     discountRate: number
   ): number {
     return total * (1 - discountRate);
   }
   ```
