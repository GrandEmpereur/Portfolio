---
name: owasp-security
description: Use when reviewing code for security vulnerabilities, implementing authentication/authorization, handling user input, or discussing web application security. Covers OWASP Top 10:2025, ASVS 5.0, and Agentic AI security (2026).
---

Apply these security standards when writing or reviewing code.

## Quick Reference: OWASP Top 10:2025

| # | Vulnerability | Key Prevention |
|---|---------------|----------------|
| A01 | Broken Access Control | Deny by default, enforce server-side, verify ownership |
| A02 | Security Misconfiguration | Harden configs, disable defaults, minimize features |
| A03 | Supply Chain Failures | Lock versions, verify integrity, audit dependencies |
| A04 | Cryptographic Failures | TLS 1.2+, AES-256-GCM, Argon2/bcrypt for passwords |
| A05 | Injection | Parameterized queries, input validation, safe APIs |
| A06 | Insecure Design | Threat model, rate limit, design security controls |
| A07 | Auth Failures | MFA, check breached passwords, secure sessions |
| A08 | Integrity Failures | Sign packages, SRI for CDN, safe serialization |
| A09 | Logging Failures | Log security events, structured format, alerting |
| A10 | Exception Handling | Fail-closed, hide internals, log with context |

## Security Code Review Checklist

### Input Handling
- [ ] All user input validated server-side
- [ ] Using parameterized queries (not string concatenation)
- [ ] Input length limits enforced
- [ ] Allowlist validation preferred over denylist

### Authentication & Sessions
- [ ] Passwords hashed with Argon2/bcrypt (not MD5/SHA1)
- [ ] Session tokens have sufficient entropy (128+ bits)
- [ ] Sessions invalidated on logout
- [ ] MFA available for sensitive operations

### Access Control
- [ ] Check for framework-level auth middleware before flagging missing per-route auth
- [ ] Authorization checked on every request
- [ ] Using object references user cannot manipulate
- [ ] Deny by default policy
- [ ] Privilege escalation paths reviewed

### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] TLS for all data in transit
- [ ] No sensitive data in URLs/logs
- [ ] Secrets in environment/vault (not code)

### Error Handling
- [ ] No stack traces exposed to users
- [ ] Fail-closed on errors (deny, not allow)
- [ ] All exceptions logged with context
- [ ] Consistent error responses (no enumeration)

## Secure Code Patterns (TypeScript/NestJS focus)

### SQL Injection Prevention
```typescript
// UNSAFE
prisma.$queryRawUnsafe(`SELECT * FROM users WHERE id = ${userId}`)

// SAFE — parameterized
prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`
```

### Access Control
```typescript
// UNSAFE — no authorization
@Get(':id')
findOne(@Param('id') id: string) {
  return this.service.findOne(id);
}

// SAFE — ownership verified
@Get(':id')
findOne(@Param('id') id: string, @CurrentUser() user: User) {
  const resource = await this.service.findOne(id);
  if (resource.organizationId !== user.organizationId) throw new ForbiddenException();
  return resource;
}
```

### Fail-Closed Pattern
```typescript
// UNSAFE — fail-open
try { return authService.check(user, resource); }
catch { return true; } // DANGEROUS

// SAFE — fail-closed
try { return authService.check(user, resource); }
catch (e) { logger.error(`Auth check failed: ${e}`); return false; }
```

## Agentic AI Security (OWASP 2026)

| Risk | Description | Mitigation |
|------|-------------|------------|
| ASI01 | Goal Hijack via prompt injection | Input sanitization, goal boundaries |
| ASI02 | Tool Misuse | Least privilege, validate I/O |
| ASI03 | Privilege Abuse | Short-lived scoped tokens |
| ASI04 | Supply Chain | Verify signatures, sandbox plugins |
| ASI05 | Code Execution | Sandbox, static analysis, human approval |
| ASI06 | Memory Poisoning | Validate stored content, segment by trust |
| ASI07 | Agent Comms Spoofing | Authenticate, encrypt, verify integrity |
| ASI08 | Cascading Failures | Circuit breakers, isolation |
| ASI09 | Trust Exploitation | Label AI content, verification steps |
| ASI10 | Rogue Agents | Behavior monitoring, kill switches |

## ASVS 5.0 Key Requirements

### Level 1 (All Applications)
- Passwords minimum 12 characters
- Check against breached password lists
- Rate limiting on authentication
- Session tokens 128+ bits entropy
- HTTPS everywhere

### Level 2 (Sensitive Data)
- MFA for sensitive operations
- Cryptographic key management
- Comprehensive security logging

### Level 3 (Critical Systems)
- Hardware security modules for keys
- Threat modeling documentation
- Penetration testing validation
