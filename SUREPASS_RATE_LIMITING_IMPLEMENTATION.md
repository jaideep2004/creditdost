# SurePass API Rate Limiting Implementation

## Overview
This document describes the implementation of rate limiting and retry logic to handle SurePass API 429 (Too Many Requests) errors in the Credit Dost application.

## Problem
The application was experiencing 429 errors from SurePass API when multiple users were making simultaneous requests for:
- Credit checks (CIBIL, CRIF, Experian, Equifax)
- PAN verification
- Bank verification
- DigiLocker integration
- eSign functionality

## Solution Implemented

### 1. SurePass API Client Utility
Created a centralized `SurepassApiClient` utility with the following features:

#### Rate Limiting
- Sliding window algorithm to track requests within a time window
- Configurable parameters via environment variables:
  - `SUREPASS_MIN_DELAY_MS`: Minimum delay between requests (default: 1500ms)
  - `SUREPASS_MAX_REQUESTS_PER_WINDOW`: Max requests per time window (default: 20)
  - `SUREPASS_RATE_LIMIT_WINDOW_MS`: Time window in milliseconds (default: 60000ms)

#### Retry Logic
- Exponential backoff with jitter for failed requests
- Special handling for 429 errors with respect for Retry-After headers
- Maximum of 3 retry attempts

#### Methods
- `makeRequest()` - Generic API request with rate limiting
- `makeCreditCheckRequest()` - Specific for credit checks (45s timeout)
- `makePanVerificationRequest()` - Specific for PAN verification (30s timeout)
- `makeBankVerificationRequest()` - Specific for bank verification (30s timeout)

### 2. Controller Updates
Updated all controllers to use the new client:

#### Credit Controller (`creditController.js`)
- Updated `checkCreditScore` function
- Updated `checkCreditScorePublic` function

#### Franchise Controller (`franchiseController.js`)
- Updated `fetchPanComprehensive` function
- Updated `fetchBankVerification` function

#### KYC Controller (`kycController.js`)
- Updated `initializeDigiLocker` function

#### Digital Agreement Controller (`digitalAgreementController.js`)
- Updated `uploadPdfToSurepassWithClientId` function
- Updated `uploadPdfToSurepass` function
- Updated eSign initialization function

### 3. Error Handling Improvements
- Added specific handling for 429 (rate limit) errors
- Better error messages for different failure scenarios
- Proper propagation of error details while maintaining security

## Configuration
Add the following to your `.env` file:

```env
# SurePass API Rate Limiting
# Minimum delay between requests in milliseconds (default: 1500)
SUREPASS_MIN_DELAY_MS=1500
# Maximum requests per time window (default: 20)
SUREPASS_MAX_REQUESTS_PER_WINDOW=20
# Time window in milliseconds (default: 60000 = 1 minute)
SUREPASS_RATE_LIMIT_WINDOW_MS=60000
```

## Benefits
1. **Reduced 429 Errors**: Rate limiting prevents hitting SurePass API limits
2. **Better User Experience**: Retry logic handles temporary failures gracefully
3. **Centralized Management**: Single point for API interactions and rate limiting
4. **Configurable**: Easy adjustment of rate limits based on SurePass account limits
5. **Maintainable**: Clean separation of concerns with dedicated API client

## Testing
The implementation follows best practices for rate limiting and includes:
- Proper error handling for various failure scenarios
- Respect for API rate limits and Retry-After headers
- Exponential backoff to prevent cascading failures
- Minimal impact on user experience during retries